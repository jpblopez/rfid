<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="9" order="1" order-md="-1">
        <v-sheet class="white pa-4">
          <div class="display-1 green--text d-block">
            {{ this.subjects[this.currentSubject].subject_description }}
          </div>
          <v-tabs v-model="subjectTab">
            <v-tabs-slider></v-tabs-slider>
            <v-tab>Attendance</v-tab>
            <v-tab>Students Enrolled</v-tab>
            <v-tab>General Settings</v-tab>
            <v-tab-item :value="0">
              <v-data-table
                :headers="attendanceHeader"
                :items="attendees"
                :items-per-page="5"
              >
                <template v-slot:top>
                  <div class="d-flex justify-end">
                    <v-btn depressed v-if="attendees.length == 0">
                      Record attendance
                    </v-btn>
                  </div>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item :value="1">
              <v-data-table
                :headers="enrolleesHeader"
                :items="enrollees"
                :items-per-page="5"
                item-key="student_name"
              >
                <template v-slot:top>
                  <div class="d-flex justify-end">
                    <v-dialog v-model="addEnrolleeDialog" max-width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn depressed v-on="on">
                          Add new enrollee
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Add a new enrollee</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-select
                                  :items="registeredStudents"
                                  v-model="addEnrollee"
                                  label="Student"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="addEnrolleeDialog = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="addNewEnrollee"
                            >Save</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </template></v-data-table
              >
            </v-tab-item>
            <v-tab-item :value="2" class="pt-10">
              Expected things to be seen here: <br />Update Subject Code,
              Description. Delete Subject. Wa na guroy schedule kay di man sad
              mag attendance ang maestra if di sad niya schedule in the first
              place.<br />
              Later lang guro ni iimplement kay di man kaayo important gud
            </v-tab-item>
          </v-tabs>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="3" order="-1" order-md="1">
        <v-card>
          <div class="d-flex justify-center py-8 green">
            <v-avatar class="white" size="100">
              <img :src="require('@/assets/avatar.png')" alt="" />
            </v-avatar>
          </div>
          <v-list rounded>
            <v-subheader>Subjects</v-subheader>
            <v-list-item-group v-model="currentSubject" color="primary">
              <v-list-item v-for="item in subjects" :key="item.subject_code">
                <v-list-item-icon>
                  <v-icon>mdi-clock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.subject_description"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-card-action>
            <v-dialog
              ref="datePicker"
              v-model="datePicker"
              persistent
              :return-value.sync="currentDate"
              transition="scale-transition"
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-btn text class="green--text" large v-on="on">
                  Select a date
                </v-btn>
              </template>
              <v-date-picker
                v-model="currentDate"
                no-title
                scrollable
                :max="maxDate"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="datePicker = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.datePicker.save(currentDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
            <v-dialog v-model="addSubjectDialog" max-width="500" persistent>
              <template v-slot:activator="{ on }">
                <v-btn text class="green--text" large v-on="on">
                  Add subject
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add a new subject</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Subject Code"
                          v-model="addSubject.code"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Subject Description"
                          v-model="addSubject.description"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addSubjectDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="addNewSubject"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-action>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="5000">
      {{ error }}
      <v-btn color="blue" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<style lang="sass"></style>

<script>
import api from "@/api/api";

export default {
  name: "Index",
  data: () => ({
    error: "",
    registeredStudents: [],
    snackbar: false,
    addEnrollee: "",
    addStudent: {
      name: "",
      course: "",
      year: ""
    },
    addSubject: {
      code: "",
      description: ""
    },
    addEnrolleeDialog: false,
    addSubjectDialog: false,
    subjectTab: 0,
    datePicker: false,
    currentSubject: 0,
    currentDate: new Date().toISOString().substr(0, 10),
    subjects: [],
    attendees: [],
    enrollees: [],
    enrolleesHeader: [
      {
        text: "Name",
        sortable: true,
        value: "student_name"
      },
      {
        text: "Course",
        sortable: true,
        value: "student_course"
      },
      {
        text: "Year",
        sortable: true,
        value: "student_year"
      }
    ],
    attendanceHeader: [
      {
        text: "Name",
        sortable: true,
        value: "student_name"
      },
      {
        text: "Course",
        sortable: true,
        value: "student_course"
      },
      {
        text: "Year",
        sortable: true,
        value: "student_year"
      },
      {
        text: "Status",
        sortable: true,
        value: "status"
      }
    ]
  }),
  computed: {
    maxDate: () => new Date().toISOString().substr(0, 10)
  },
  async created() {
    try {
      const res = await api.getSubjects();
      this.subjects = res;
    } catch (error) {
      this.error = "Failed to load subjects";
    }
  },
  watch: {
    async addEnrolleeDialog() {
      try {
        const res = await this.getStudents();
        res.forEach(item => {
          this.registeredStudents.push({
            value: item.id,
            text: item.student_name
          });
        });
      } catch (e) {
        this.error = "Failed to load students";
      }
    },
    error() {
      this.snackbar = true;
    },
    currentSubject() {
      this.getAttendees();
      this.getEnrollees();
    },
    currentDate() {
      this.getAttendees();
    },
    attendees() {
      this.attendees.forEach(item => {
        item.status = item.status == 1 ? "On time" : "Late";
      });
    }
  },
  methods: {
    async getStudents() {
      try {
        const res = await api.getStudents();
        return res;
      } catch (e) {
        this.error = "Failed to load students";
      }
    },
    async getAttendees() {
      try {
        const res = await api.getAttendees(
          this.subjects[this.currentSubject].subject_code,
          this.currentDate
        );
        this.attendees = res;
      } catch (e) {
        this.error = "Failed to load attendees";
      }
    },
    async getEnrollees() {
      try {
        const res = await api.getSubjectEnrollees(
          this.subjects[this.currentSubject].subject_code
        );
        this.enrollees = res;
      } catch (e) {
        this.error = "Failed to load enrollees";
      }
    },
    async addNewEnrollee() {
      try {
        await api.addEnrollee(this.subjects[this.currentSubject].subject_code, {
          student: this.addEnrollee
        });

        this.addStudentDialog = false;
        this.getEnrollees();
        this.addEnrolleeDialog = false;
      } catch (e) {
        this.error = "Failed to add student";
      }
    },
    async addNewSubject() {
      try {
        const data = {
          subject_code: this.addSubject.code,
          subject_description: this.addSubject.description
        };

        await api.addSubject(data);
        this.addSubjectDialog = false;
      } catch (e) {
        this.error = "Failed to add subject";
      }
    }
  }
};
</script>
