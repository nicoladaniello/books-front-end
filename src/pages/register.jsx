import { Link, navigate } from "gatsby";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../components/auth/useAuth";
import { upsert } from "../components/companies/actions";
import routes from "../settings/routes";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
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
            <h1 className="display-3 font-weight-bold mb-4">Books</h1>
            <h4 className="mb-2">{t("modules.company.insert")}</h4>
          </div>

          <Card className="mb-3">
            <Card.Body>
              <Form
                className="text-left"
                onSubmit={handleSubmit(createCompany)}
              >
                <Form.Group>
                  <Form.Label>{t("common.name")}</Form.Label>
                  <Form.Control
                    {...register("name", { required: true, minLength: 3 })}
                    type="text"
                    disabled={state.isLoading}
                    className={errors.name && "is-invalid"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name && errors.name.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>{t("common.password")}</Form.Label>
                  <Form.Control
                    {...register("password")}
                    type="password"
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
                  {t("common.insert")}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <p className="text-center text-small">{t("common.otherwise")}</p>
          <Button block variant="light" as={Link} to={routes.login}>
            {t("common.login")}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
