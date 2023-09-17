import { DANGER, SUCCESS } from "constants/variant";
import { useState } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { postUser } from "services/userService";

function AddUser() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const addUser = async () => {
    setloading(true);
    setSuccess(false);
    setError("");
    const { data, error } = await postUser(formData);
    if (data && !error) {
      setSuccess(true);
      setloading(false);
      setFormData({});
    } else {
      setError(error);
      setloading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(false);

    const form = event.currentTarget;
    if (form.checkValidity()) addUser();
    else setValidated(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAlert = () => {
    const variant = success ? SUCCESS : DANGER;
    const message = error || "User added successfully";
    return (
      <Alert key={variant} variant={variant} dismissible>
        {message}
      </Alert>
    );
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {(success || error) && getAlert()}
      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            name="firstname"
            placeholder="First name"
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastname"
            onChange={handleChange}
            placeholder="Last name"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>
        {/* <Form.Group as={Col} md="6" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
        </Form.Group> */}
      </Row>
      <div className="d-grid gap-2">
        <Button
          type="submit"
          variant={loading ? "secondary" : "primary"}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Add user"}
        </Button>
      </div>
    </Form>
  );
}

export default AddUser;
