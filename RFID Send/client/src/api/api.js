import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  async getStudents() {
    try {
      const { data } = await api.get("/students");
      return data.result;
    } catch (error) {
      throw error;
    }
  },
  async getSubjects() {
    try {
      const { data } = await api.get("/subjects");
      return data.results;
    } catch (error) {
      throw error;
    }
  },
  async getAttendees(subject, date) {
    try {
      const { data } = await api.get(`/subjects/${subject}/attendees/${date}`);
      return data.results;
    } catch (error) {
      throw error;
    }
  },
  async getSubjectEnrollees(subject) {
    try {
      const { data } = await api.get(`/subjects/${subject}/students`);
      return data.results;
    } catch (error) {
      throw error;
    }
  },
  async addEnrollee(subject, student) {
    try {
      const { data } = await api.post(`/subjects/${subject}/students`, student);
      return data.result;
    } catch (e) {
      throw e;
    }
  },
  async addSubject(subject) {
    try {
      const { data } = await api.post("/subjects", subject);
      return data.results;
    } catch (e) {
      throw e;
    }
  },
  async addNewStudent(student) {
    try {
      const { data } = await api.post("/students", student);
      return data.results;
    } catch (e) {
      throw e;
    }
  }
};
