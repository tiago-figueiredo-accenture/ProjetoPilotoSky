package com.backend.controller;

import com.backend.message.MessageProducer;
import com.backend.model.Client;
import com.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    MessageProducer messageProducer;

    @GetMapping
    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Client getClient(@PathVariable Long id) {
        Client client = clientRepository.findById(id).orElseThrow(RuntimeException::new);
        messageProducer.sendMessage(client, "sky-stream-teste-01", "listado");
        return client;
    }

    @PostMapping
    public ResponseEntity createClient(@RequestBody Client client) throws URISyntaxException {
        Client savedClient = clientRepository.save(client);
        messageProducer.sendMessage(client, "sky-stream-teste-01", "inserido");
        return ResponseEntity.created(new URI("/clients/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody Client client) {
        Client currentClient = clientRepository.findById(id).orElseThrow(RuntimeException::new);
        currentClient.setName(client.getName());
        currentClient.setEmail(client.getEmail());
        currentClient = clientRepository.save(client);
        messageProducer.sendMessage(client, "sky-stream-teste-01", "alterado");
        return ResponseEntity.ok(currentClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        Client client = clientRepository.findById(id).orElseThrow(RuntimeException::new);
        clientRepository.deleteById(id);
        messageProducer.sendMessage(client, "sky-stream-teste-01", "apagado");
        return ResponseEntity.ok().build();
    }
}
