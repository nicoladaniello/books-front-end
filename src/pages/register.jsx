import { Link, navigate } from "gatsby";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import useResource from "../hooks/useResource";
import { authStatus } from '../reducers/authSlice';
import { httpRequestStatus } from "../resources/createResource";
import routes from "../settings/routes";

const Register = () => {
  const state = useSelector((state) => state.companies);
  const companies = useResource("companies");
  const auth = useAuth();
  const { register, errors, handleSubmit } = useForm();

  const isLoading = state.status === httpRequestStatus.pending;

  useEffect(() => {
    console.log(state.error);
  }, [state.error]);

  /**
   * Creates a new company and attempts to login. On success redirects to the homepage.
   *
   * @param {*} e - The form submission event.
   */
  // const createCompany = async (company) => {
  //   isBusy(true);

  //   try {
  //     await companies.insert(company);
  //     await auth.login(company);
  //     navigate(routes.home);
  //   } catch (ex) {
  //     const errors = ex.response?.data?.errors;

  //     if (errors) {
  //       errors.forEach(({ property, message }) =>
  //         setError(property, { message })
  //       );
  //     } else {
  //       console.error(ex, ex.response);
  //       await errorDialog.open({
  //         message: ex.response?.data?.message || ex.message,
  //       });
  //     }
  //   }

  //   isBusy(false);
  // };

  /**
   * If the user is already logged in redirects to the homepage.
   */
  if (auth.status === authStatus.authenticated) {
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
                onSubmit={handleSubmit(companies.insert)}
              >
                <Form.Group>
                  <Form.Label>Ragione Sociale</Form.Label>
                  <Form.Control
                    ref={register({ required: true, minLength: 3 })}
                    type="text"
                    name="name"
                    placeholder="Azienda SRC"
                    disabled={isLoading}
                    className={errors.name && "is-invalid"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name && errors.name.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    ref={register({ required: true, minLength: 3 })}
                    type="password"
                    name="password"
                    placeholder="password"
                    disabled={isLoading}
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
                  disabled={isLoading}
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
