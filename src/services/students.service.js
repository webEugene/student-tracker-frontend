import { axiosHandler } from '../axios.config';
import getCompanyId from '../helpers/getCompanyId';

export { StudentsService };

class StudentsService {
  /**
   * Create a new student
   *
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static createStudent(params) {
    // const { name, surname, mobilePhone, birthday, group_id, gender } = params;
    return axiosHandler.post(`${process.env.VUE_APP_API_ENDPOINT}/v1/students`, {
      ...params,
      company_id: getCompanyId(),
    });
  }

  /**
   * Update a new student
   *
   * @param {string} name
   * @returns {Promise<AxiosResponse<any>>}
   */
  static updateStudent(id, params) {
    // const { name, surname, phone, birthday, group_id, gender } = params;
    return axiosHandler.patch(`${process.env.VUE_APP_API_ENDPOINT}/v1/students/${id}`, {
      ...params,
      company_id: getCompanyId(),
    });
  }

  /**
   * Delete student
   *
   * @param {string} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static deleteStudent(id) {
    return axiosHandler.delete(`${process.env.VUE_APP_API_ENDPOINT}/v1/students/${id}`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Get all students
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getAllStudents() {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/students`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Get student by ID
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static findOneStudent(id) {
    return axiosHandler.get(`${process.env.VUE_APP_API_ENDPOINT}/v1/students/${id}`, {
      params: {
        company_id: getCompanyId(),
      },
    });
  }

  /**
   * Change group for student
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static studentGroupChange(params) {
    const { id, group_id } = params;
    return axiosHandler.patch(
      `${process.env.VUE_APP_API_ENDPOINT}/v1/students/student-group-change/${id}`,
      {
        group_id,
        company_id: getCompanyId(),
      },
    );
  }

  /**
   * Set/Change student's avatar
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static studentAvatarChange(id, formData) {
    return axiosHandler.patch(
        `${process.env.VUE_APP_API_ENDPOINT}/v1/students/upload-avatar/${id}`,
        formData,
        {
          params: {
            company_id: getCompanyId(),
          },
        },
    );
  }

  /**
   * Delete student's avatar
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  static studentRemoveAvatar(id, avatar_path) {
    return axiosHandler.delete(
      `${process.env.VUE_APP_API_ENDPOINT}/v1/students/delete-avatar/${id}`,
      {
        params: {
          avatar_path,
          company_id: getCompanyId(),
        },
      },
    );
  }
}
