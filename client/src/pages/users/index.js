import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Stack,
  Card,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import Loader from "component/loader";
import ToastBar from "component/toastbar";
import { getUsers } from "services/userService";
import { DANGER } from "constants/variant";
import AddUser from "./adduser-form";
import { FaRedo } from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //SERVICES
  const fetchUsers = async () => {
    setloading(true);
    setError("");
    setUsers([]);
    const { data, error } = await getUsers();
    if (data && !error) {
      setUsers(data);
      setloading(false);
    } else {
      setError(error);
      setloading(false);
    }
  };

  //USE EFFECT
  useEffect(() => {
    fetchUsers();
  }, []);

  //HANDLERS
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <h3>Users</h3>
          </div>
          <div className="p-2 ms-auto">
            <Button className="m-2" variant="link" onClick={fetchUsers}>
              <FaRedo /> refresh
            </Button>
            <Button variant="primary" onClick={toggleModal}>
              Add user
            </Button>
          </div>
        </Stack>

        {users?.length > 0 && (
          <>
            <Row>
              {users.map((user) => {
                const { firstname, lastname, _id, description } = user;
                return (
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <Card key={_id}>
                      <Card.Body>
                        <Card.Title>{`${firstname} ${lastname}`}</Card.Title>
                        <Card.Text>{description}</Card.Text>

                        <div className="d-flex justify-content-end">
                          <Link to={`${_id}`}>
                            <Button variant="primary" size="sm">
                              view profile
                            </Button>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
        {error && <ToastBar varient={DANGER} message={error} />}
      </Container>
      <Modal
        show={showModal}
        onHide={toggleModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUser />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={toggleModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Users;
