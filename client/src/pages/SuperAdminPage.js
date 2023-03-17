import React from 'react';
import {observer} from "mobx-react-lite";
import {useContext, useState} from "react";
import {Context} from "../index";
import {useLocation, useNavigate, useNavigation} from "react-router";
import {registration} from "../http/userAPI";
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const click = async () => {
        try {
            await registration(login, password);
            navigate("/auth")
        } catch (e) {
            alert(e)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш логин"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            Регистрация нового адимна
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
