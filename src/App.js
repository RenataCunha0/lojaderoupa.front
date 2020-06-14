import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableHead,
    TableBody,
    TableCell,  
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    TextField,
    DialogActions } from '@material-ui/core';
import './style.css';


function App() {

    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ cliente, setCliente] = useState('');
    const [ produto, setProduto] = useState('');
    const [ fornecedor, setFornecedor] = useState('');

    function loadData() {
        api.get('/lojaderoupa').then((response) => {
            const itens = response.data;
            setLista(itens);
        })
    }

    useEffect(() => loadData(), []);

    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

    //Função para adicionar um novo produto
    function addProduto() { 
        const client = cliente;
        const product = produto;
        const provider = fornecedor;
        api.post('/lojaderoupa', { cliente: client, produto: product, fornecedor : provider }).then((response) => {
        setCliente('');
        setProduto('');
        setFornecedor('');
        setOpen(false);
        loadData()
        })

    
    }


    //Função para excluir um produto da lista.
     function deleteProduto(id) {
         api.delete(`/lojaderoupa/${id}`).then((response) => {
            loadData()
         })
     }


    return (
        <>
        <Header />
        <Container maxWidth="lg" className="container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>cliente</TableCell>
                        <TableCell>produto</TableCell>
                        <TableCell>fornecedor</TableCell>
                        <TableCell>Apagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.cliente}</TableCell>
                            <TableCell>{item.produto}</TableCell>
                            <TableCell>{item.fornecedor}</TableCell>
                             <Button variant="outlined" size="small" color="secondary" onClick={() => deleteProduto(item.id)} >Apagar</Button>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
            </Container>
            <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
                <DialogTitle id="form-dialog-title">Novo Produto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Digite o produto que deseja adicionar.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cliente"
                        label="Cliente"
                        type="text"
                        fullWidth
                        value={cliente}
                        onChange={e => setCliente (e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="produto"
                        label="Produto"
                        type="text"
                        fullWidth
                        value={produto}
                        onChange={e => setProduto(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="fornecedor"
                        label="Fornecedor"
                        type="text"
                        fullWidth
                        value={fornecedor}
                        onChange={e => setFornecedor(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addProduto} color="primary">
                        Salvar
                    </Button>
                 </DialogActions>
            </Dialog>
        </>
    );

}

export default App;
