import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ADMIN} from "../consts/pageConsts";

const Auth = observer(() => {
    const {user_store} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log(user_store.isAuth)

    const letsAuth = async () => {
        try {
            console.log(email, password)
            await login(email, password).then(user => {
                console.log(user)
                console.log(user.email)
                user_store.setUser(user)
                user_store.setIsAuth(true)
                navigate(ADMIN)
            })


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
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="d-flex justify-content-between p-3 mb-3" style={{flexDirection: "row"}}>
                        <Button variant="outline-success" style={{width: "30%"}} onClick={letsAuth}>
                            Войти
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});


export default Auth;