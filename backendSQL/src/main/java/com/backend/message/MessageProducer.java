package com.backend.message;

import com.backend.model.Client;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class MessageProducer {

    public void sendMessage(Client client, String topico, String operacao) {

        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        String mensagem = new StringBuilder().append("Cliente ").append(client.toString()).append(" ").append(operacao).append(" com sucesso").toString();

        try (KafkaProducer<String, String> producer = new KafkaProducer(props)) {
            ProducerRecord<String, String> message = new ProducerRecord<>(topico, mensagem);
            producer.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}