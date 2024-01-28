import Loader from "component/loader";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Collapse,
  Badge,
} from "react-bootstrap";
import { getTodoList, postTodo, patchTodo } from "services/todoService";
import ToastBar from "component/toastbar";
import { DANGER } from "constants/variant";
import { PENDING, DONE } from "constants/app";
import { FaTrashAlt } from "react-icons/fa";
import { getFormattedData } from "./helpers";
import "./styles.css";

function Todo() {
  const [todoList, setTodoList] = useState(null);
  const [loading, setloading] = useState(false);
  const [openCompleted, setOpenCompleted] = useState(false);
  const [item, setItem] = useState("");
  const [error, setError] = useState("");

  const variant = item ? "primary" : "outline-secondary";

  // SERVICES
  const fetchTodoList = async () => {
    setloading(true);
    setError("");
    const { data, error } = await getTodoList();
    if (data && !error) {
      const formattedData = getFormattedData(data);
      setTodoList(formattedData);
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

  const updateTodo = async (status, id) => {
    setloading(true);
    setError("");
    const { data, error } = await patchTodo(status, id);
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

  const handleChecked = (event, id) => {
    const { checked } = event.target;
    const status = checked ? DONE : PENDING;
    updateTodo(status, id);
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
            {todoList?.pending?.length > 0 &&
              todoList.pending.map((item) => {
                return (
                  <InputGroup className="mb-3" key={item._id}>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={false}
                      onChange={(e) => handleChecked(e, item._id)}
                    />
                    <Form.Control
                      type="text"
                      aria-label="Text input with checkbox"
                      defaultValue={item.itemName}
                    />
                    <Button variant="outline-danger" className="icon-btn">
                      <FaTrashAlt />
                    </Button>
                  </InputGroup>
                );
              })}

            {todoList?.done?.length > 0 && (
              <>
                <hr />
                <Button
                  onClick={() => setOpenCompleted(!openCompleted)}
                  aria-controls="done-list"
                  aria-expanded={openCompleted}
                  className="mb-2"
                  variant="outline-success"
                  size="sm"
                >
                  Completed <Badge bg="success">{todoList.done.length}</Badge>
                </Button>
                <Collapse in={openCompleted}>
                  <div id="done-list">
                    {todoList.done.map((item) => {
                      return (
                        <InputGroup className="mb-3" key={item._id}>
                          <InputGroup.Checkbox
                            aria-label="Checkbox for following text input"
                            checked={true}
                            onChange={(e) => handleChecked(e, item._id)}
                          />
                          <Form.Control
                            type="text"
                            aria-label="Text input with checkbox"
                            defaultValue={item.itemName}
                            disabled
                            readOnly
                          />
                          <Button variant="outline-danger" className="icon-btn">
                            <FaTrashAlt />
                          </Button>
                        </InputGroup>
                      );
                    })}
                  </div>
                </Collapse>
              </>
            )}
          </Col>
        </Row>
        {error && <ToastBar varient={DANGER} message={error} />}
      </Container>
    </>
  );
}

export default Todo;
