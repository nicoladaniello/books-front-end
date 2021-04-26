import { Link, navigate } from "gatsby";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../components/auth/useAuth";
import { upsert } from "../components/companies/actions";
import routes from "../settings/routes";
import { unwrapResult } from "@reduxjs/toolkit";

const Register = () => {
  const state = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const auth = useAuth();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm();

  useEffect(() => {
    console.log(state.error);
  }, [state.error]);

  /**
   * Creates a new company and attempts to login. On success redirects to the homepage.
   *
   * @param {*} e - The form submission event.
   */
  const createCompany = async (company) => {
    try {
      const result = await dispatch(upsert(company));
      unwrapResult(result);

      const login = await auth.login(company);
      unwrapResult(login);

      navigate(routes.home);
    } catch (error) {
      console.log(error);
      const errors = error.response?.data?.errors;

      if (errors) {
        errors.forEach(({ property, message }) =>
          setError(property, { message })
        );
      } else {
        console.error(error, error.response);
      }
    }
  };

  /**
   * If the user is already logged in redirects to the homepage.
   */
  if (auth.isAuthenticated) {
    navigate(routes.home);
    return null;
  }

  /**
   * UI
   */
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="5">
          <div className="text-center">
            <h5 className="mb-0">Benvenuto in</h5>
            <h1 className="display-3 font-weight-bold mb-4">Books</h1>
            <h4 className="mb-2">Registra un'azienda</h4>
          </div>

          <Card className="mb-3">
            <Card.Body>
              <Form
                className="text-left"
                onSubmit={handleSubmit(createCompany)}
              >
                <Form.Group>
                  <Form.Label>Ragione Sociale</Form.Label>
                  <Form.Control
                    {...register("name", { required: true, minLength: 3 })}
                    type="text"
                    placeholder="Azienda SRC"
                    disabled={state.isLoading}
                    className={errors.name && "is-invalid"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name && errors.name.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    {...register("password")}
                    type="password"
                    placeholder="password"
                    disabled={state.isLoading}
                    className={errors.password && "is-invalid"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password && errors.password.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  block
                  type="submit"
                  className="my-4"
                  variant="primary"
                  disabled={state.isLoading}
                >
                  Registra
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <p className="text-center">
            Se sei già registrato <Link to={routes.login}>accedi qui</Link>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
