import Loader from "component/loader";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { getTodoList, postTodo } from "services/todoService";
import ToastBar from "component/toastbar";
import { DANGER } from "constants/variant";
import { getFormatedData } from "./helpers";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./styles.css";

function Todo() {
  const [todoList, setTodoList] = useState(null);
  const [loading, setloading] = useState(false);
  const [item, setItem] = useState("");
  const [error, setError] = useState("");

  const variant = item ? "primary" : "outline-secondary";

  // SERVICES
  const fetchTodoList = async () => {
    setloading(true);
    setError("");
    const { data, error } = await getTodoList();
    if (data && !error) {
      const formatedData = getFormatedData(data);
      setTodoList(formatedData);
      setloading(false);
    } else {
      setError(error);
      setloading(false);
    }
  };

  const addTodo = async () => {
    setloading(true);
    setError("");
    const { data, error } = await postTodo(item);
    if (data && !error) {
      setItem("");
      fetchTodoList();
    } else {
      setError(error);
      setloading(false);
    }
  };

  // USE-EFFECT
  useEffect(() => {
    fetchTodoList();
  }, []);

  // HANDLERS
  const handleChange = (event) => {
    const { value } = event.target;
    setItem(value);
  };

  const handleAddTodo = () => {
    if (item) addTodo();
  };

  return (
    <>
      {loading && <Loader />}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs md="10" lg="6">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Todo item"
                onChange={handleChange}
                value={item}
              />
              <Button
                variant={variant}
                id="button-addon2"
                onClick={handleAddTodo}
                disabled={!item}
              >
                Add
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Checkbox aria-label="Checkbox for following text input" />
              <Form.Control aria-label="Text input with checkbox" />
              <Button variant="outline-secondary" className="icon-btn">
                <FaEdit />
              </Button>
              <Button variant="outline-danger" className="icon-btn">
                <FaTrashAlt />
              </Button>
            </InputGroup>
          </Col>
        </Row>
        {error && <ToastBar varient={DANGER} message={error} />}
      </Container>
    </>
  );
}

export default Todo;
