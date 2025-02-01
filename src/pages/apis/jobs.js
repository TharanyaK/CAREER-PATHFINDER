import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import moment from "moment";

export const addNewJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    await addDoc(collection(fireDB, "jobs"), {
      ...payload,
      status: "pending",
      posterByUserId: user.id,
      posterByUserName: user.name,
      posterOn: moment().format("DD-MM-YYYY HH:mm A"),
    });

    //send notification to admin

    await addDoc(collection(fireDB, "users", "admin", "notifications"), {
      title: `New Job Post Request from ${user.name}`,
      onClick: "/admin/jobs",
      postedOn: moment().format("DD-MM-YYYY HH:mm A"),
      status: "unread",
    });
    return {
      success: true,
      message: "Job posted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getPostedJobsByUserId = async (userId) => {
  try {
    const jobs = [];
    const qry = query(collection(fireDB, "jobs"), orderBy("posterOn", "desc"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      if (doc.data().posterByUserId === userId) {
        jobs.push({ id: doc.id, ...doc.data() });
      }
    });

    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getJobById = async (id) => {
  try {
    const docRef = doc(fireDB, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No such job!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getAllJobs = async (filters) => {
  try {
    let whereConditions = [];

    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          whereConditions.push(where(key, "==", filters[key]));
        }
      });
    }

    const jobs = [];
    const qry = query(collection(fireDB, "jobs"), ...whereConditions);
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });

    const sortedPosts = jobs.sort((a, b) => {
      return moment(b.postedOn, "DD-MM-YYYY HH:mm A").diff(
        moment(a.postedOn, "DD-MM-YYYY HH:mm A")
      );
    });

    return {
      success: true,
      data: sortedPosts,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing get wrong",
    };
  }
};

export const editJobDetails = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Jub updated successfylly",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const changeJobStatusFromAdmin = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });

    //send notification to user

    await addDoc(
      collection(fireDB, "users", payload.posterByUserId, "notifications"),
      {
        title: `Your job post request for ${payload.title} has been ${payload.status}`,
        onClick: `/posted-jobs`,
        createdAt: moment().format("DD-MM-YYYY HH:mm A"),
        status: "unread",
      }
    );

    return {
      success: true,
      message: "Jub updated successfylly",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const deleteJobById = async (id) => {
  try {
    await deleteDoc(doc(fireDB, "jobs", id));
    return {
      success: true,
      message: "Job delete successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const applyJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const job = payload;
  try {
    await addDoc(collection(fireDB, "applications"), {
      jobId: job.id,
      jobTitle: job.title,
      company: job.companyName,
      userId: user.id,
      userName: user.name,
      email: user.email,
      phoneNumber: user?.phoneNumber || "",
      status: "pending",
      appliedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job applied successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getApplicationsByUserId = async (userId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getApplicationsByJobId = async (jobId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("jobId", "==", jobId)
    );
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getAllApplications = async () => {
  try {
    const applications = [];
    const qry = query(collection(fireDB, "applications"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });

    console.log(applications);
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const changeApplicationStatus = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "applications", payload.id), {
      status: payload.status,
    });

    // send notification to the user

    await addDoc(collection(fireDB, `users/${payload.userId}/notifications`), {
      title: `Your application for ${payload.jobTitle} in ${payload.company} is ${payload.status}`,
      onClick: "applied-jobs",
      status: "unread",
      createdAt: moment().format("DD:MM:YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Application status update successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};
