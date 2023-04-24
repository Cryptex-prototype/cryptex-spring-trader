
//package com.cryptex.cryptexspringtrader.services;
//
//import com.cryptex.cryptexspringtrader.controllers.WatchlistController;
//import com.cryptex.cryptexspringtrader.models.CoinData;
//import com.cryptex.cryptexspringtrader.models.Watchlist;
//import com.cryptex.cryptexspringtrader.repositories.CoinDataRepository;
//import com.cryptex.cryptexspringtrader.repositories.WatchlistRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class WatchlistService {
//    @Autowired
//    private WatchlistRepository watchlistRepository;
//    @Autowired
//    private CoinDataRepository coinDataRepository;
//
//    // Other methods
//
//    public Watchlist createOrUpdateWatchlist(WatchlistController.WatchlistData watchlist) {
//        List<WatchlistController.CoinData> managedCoinDataList = new ArrayList<>();
//
//        for (WatchlistController.CoinData coinData : watchlist.getCoinDataList()) {
//            Optional<CoinData> optionalCoinData = coinDataRepository.findById(coinData.getId());
//            if (optionalCoinData.isPresent()) {
//                managedCoinDataList.add(optionalCoinData.get());
//            } else {
//                throw new RuntimeException("CoinData not found with ID: " + coinData.getId());
//            }
//        }
//
//        watchlist.setCoinDataList(managedCoinDataList);
//        return watchlistRepository.save(watchlist);
//    }
//
//    public void deleteWatchlist(Long id) {
//        Optional<Watchlist> watchlist = watchlistRepository.findById(id);
//
//        if (watchlist.isPresent()) {
//            watchlistRepository.delete(watchlist.get());
//        } else {
//            throw new RuntimeException("Watchlist not found with ID: " + id);
//        }
//    }
//
//    public List<Watchlist> getAllWatchlists() {
//        return watchlistRepository.findAll();
//    }
//}

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


    // Other methods
    // Inside your WatchlistService.java (or similar) class
    public void createWatchlistForUser(Watchlist watchlist, UserDetails userDetails) {
        // Retrieve the user from the database using the userDetails
        // Replace User and UserRepository with your actual user entity and repository classes
        User user = userRepository.findByUsername(userDetails.getUsername());

        // Set the user for the watchlist
        watchlist.setUser(user);

        // Save the watchlist to the database
        watchlistRepository.save(watchlist);
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

    public Optional<Watchlist> getWatchlistById(Long id) {
        return watchlistRepository.findById(id);
    }

}

//package com.cryptex.cryptexspringtrader.services;
//
//import com.cryptex.cryptexspringtrader.controllers.WatchlistController;
//import com.cryptex.cryptexspringtrader.models.CoinData;
//import com.cryptex.cryptexspringtrader.models.Watchlist;
//import com.cryptex.cryptexspringtrader.repositories.CoinDataRepository;
//import com.cryptex.cryptexspringtrader.repositories.WatchlistRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class WatchlistService {
//    @Autowired
//    private WatchlistRepository watchlistRepository;
//    @Autowired
//    private CoinDataRepository coinDataRepository;
//
//    // Other methods
//
//    public Watchlist createOrUpdateWatchlist(WatchlistController.WatchlistData watchlistData) {
//        List<CoinData> managedCoinDataList = new ArrayList<>();
//
//        for (CoinData coinData : watchlistData.getCoinDataList()) {
//            Optional<CoinData> optionalCoinData = coinDataRepository.findById(coinData.getId());
//            if (optionalCoinData.isPresent()) {
//                managedCoinDataList.add(optionalCoinData.get());
//            } else {
//                throw new RuntimeException("CoinData not found with ID: " + coinData.getId());
//            }
//        }
//
//        Watchlist watchlist = new Watchlist();
//        watchlist.setName(watchlistData.getName());
//        return watchlist;
//    }
//}
