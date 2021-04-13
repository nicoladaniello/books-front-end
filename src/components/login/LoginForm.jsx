import React from "react";
import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import httpRequestStatus from "../../utils/httpRequestStatus";

/**
 *
 */
const LoginForm = ({ user, onDismiss }) => {
  const {
    loginRequest: { status, error },
    login,
    clearLoginRequest,
  } = useAuth();
  const { register, handleSubmit } = useForm();

  const isLoading = status === httpRequestStatus.pending;

  const handleDismiss = () => {
    clearLoginRequest();
    onDismiss();
  };

  /**
   * UI
   */
  return (
    <Card>
      <Card.Header className="p-0"></Card.Header>
      <Card.Body>
        {!!error && <Alert variant="danger">{error.data?.message}</Alert>}
        <Form onSubmit={handleSubmit(login)}>
          <Form.Group>
            <InputGroup>
              <Form.Control
                {...register("username")}
                name="username"
                plaintext
                readOnly
                defaultValue={user.name}
              />
            </InputGroup>
            <Form.Control
              {...register("password")}
              name="password"
              type="password"
              placeholder="Password"
              disabled={isLoading}
            />
          </Form.Group>
          <Button block variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Accesso in corso..." : "Accedi"}
          </Button>
          <Button
            block
            variant="light"
            type="button"
            disabled={isLoading}
            onClick={() => handleDismiss()}
          >
            Annulla
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
