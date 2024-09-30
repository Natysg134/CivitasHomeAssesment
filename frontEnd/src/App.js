import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table, InputGroup, Spinner } from "react-bootstrap";
import "./App.css";

const initialFormData = {
  subject: '',
  courseNumber: '',
  description: ''
}

function App() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  
  const API_URL = "http://localhost:5250";

  const closeModal = () => {
    setShow(false);
    setShowEdit(false);
    setFormError('');
    setFormData(initialFormData);
  };
  const openModal = () => setShow(true);
  const openModalUpdate = (course) => {
    setFormData(course);
    setShowEdit(true);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    fetch(API_URL + "/api/courseapi")
      .then((response) => response.json())
      .then((data) => {setCourses(data);
          setLoading(false);})
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'courseNumber') {
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData);
    setLoading(true);
    fetch(API_URL + "/api/courseapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses([...courses, data]);
        closeModal();
        setFormData(initialFormData);
        setLoading(false);
      })
      .catch((error) => {
        setFormError('Error creating course. Your information may be duplicate');
        setLoading(false);
      });
  };

  const updateCourse = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData);
    setLoading(true);
    fetch(API_URL + "/api/courseapi/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
        closeModal();
        setLoading(false);
      });
  }

  const deleteCourse = (courseNumber) => {
    setLoading(true);
    fetch(API_URL + "/api/courseapi/" + courseNumber, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          
        }
        setCourses(data);
        setLoading(false);
      });
  };

  const submitSearch = () => {
    if (description) {
      searchCourse(description);
    } else{
      refreshData();
    }
  }

  const searchCourse = (description) => {
    const query = encodeURIComponent(description);
    fetch(`${API_URL}/api/courseapi/search?description=${query}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  return (
    <div className="wrapper">
      <Modal show={show || showEdit} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{show && 'Create a new course'}{showEdit && 'Update Course Description'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={showEdit}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course Number. Example: 001"
                name="courseNumber"
                value={formData.courseNumber}
                onChange={handleChange}
                disabled={showEdit}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Course Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          {formError && <p className="error">{formError}</p>}
          {formData.courseNumber?.length > 3 && <p className="error">{'Course number cannot be longer than 3 characters'}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={showEdit ? updateCourse : submitForm} disabled={formData.courseNumber?.length > 3}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <InputGroup>
        <Form.Control
         type="text"
          placeholder="Search by description"
          aria-label="Recipient's username with two button addons"
          name="description"
          onChange={(e) => setDescription(e.target.value)} // Added onChange handler
        />
        <Button variant="outline-secondary" onClick={submitSearch}>Search</Button>
      </InputGroup>

      {courses.length > 0 ? <Table striped bordered hover>
      <thead>
        <tr>
          <th>Course Number</th>
          <th>Subject</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {courses.map((course) => (
        <tr key={course.courseNumber}>
        <td>{course.courseNumber}</td>
        <td>{course.subject}</td>
        <td>{course.description}</td>
        <td>
            <Button variant="primary" onClick={() => openModalUpdate(course)}>Edit</Button>
            <Button variant="danger" onClick={() => deleteCourse(course.courseNumber)}>Delete</Button>
          </td>
        </tr>
        ))}
      </tbody>
    </Table> : <p>No courses found</p>}
        <Button variant="primary" onClick={openModal}>
          Create a new course
        </Button>
    {loading && <div className="spinnerOverlay">   
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>}
    </div>
  );
}

export default App;
