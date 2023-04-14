package com.cryptex.cryptexspringtrader.repositories;

import com.cryptex.cryptexspringtrader.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

