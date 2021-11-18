package com.backend.repository;

import com.backend.model.Client;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface ClientRepository extends MongoRepository <Client, String> {
}
