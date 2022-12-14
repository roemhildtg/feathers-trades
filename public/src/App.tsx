import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Container, Divider } from '@hope-ui/solid';
import { A, Route, Routes, useNavigate } from '@solidjs/router';
import { Component, createSignal, lazy, onMount, Show } from 'solid-js';
import Nav from './components/Nav';
import Login from './routes/Login';
import { client } from './services/feathers';

const List = lazy(() => import('./routes/List'));
const Item = lazy(() => import('./routes/Item'));
const Create = lazy(() => import('./routes/Create'));
const Home = lazy(() => import('./routes/Home'))

const App: Component = () => {

  const nav = useNavigate();

  onMount(() => {
    return client.reAuthenticate()
      .then(() => nav('/list'))
      .catch(e => nav('/login'))

  })

  return (
    <>
      <Container>

        <Nav></Nav>

        <Divider></Divider>

        <Routes>
          <Route path="/" component={Home} ></Route>
          <Route path="/login" component={Login} ></Route>
          <Route path="/list" component={List} ></Route>
          <Route path="/new" component={Create} ></Route>
          <Route path="/item/:id" component={Item}></Route>
        </Routes>
      </Container>
    </>
  );
};

export default App;
