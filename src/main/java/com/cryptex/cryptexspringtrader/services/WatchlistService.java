
package com.cryptex.cryptexspringtrader.services;

import com.cryptex.cryptexspringtrader.models.User;
import com.cryptex.cryptexspringtrader.models.Watchlist;
import com.cryptex.cryptexspringtrader.repositories.UserRepository;
import com.cryptex.cryptexspringtrader.repositories.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class WatchlistService {
    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private UserRepository userRepository;



    public Watchlist createWatchlistForUser(Watchlist watchlist, User user) {
        // Retrieve the user from the database using the userDetails
        // Replace User and UserRepository with your actual user entity and repository classes
//        User user = userRepository.findByUsername(userDetails.getUsername());

        // Set the user for the watchlist
        watchlist.setUser(user);

        // Save the watchlist to the database
        watchlistRepository.save(watchlist);
        return watchlist;
    }


    public Watchlist createOrUpdateWatchlist(Watchlist watchlist) {
        return watchlistRepository.save(watchlist);
    }

    public void deleteWatchlist(Long id) {
        Optional<Watchlist> watchlist = watchlistRepository.findById(id);

        if (watchlist.isPresent()) {
            watchlistRepository.delete(watchlist.get());
        } else {
            throw new RuntimeException("Watchlist not found with ID: " + id);
        }
    }

    public List<Watchlist> getAllWatchlists() {
        return watchlistRepository.findAll();
    }
}
