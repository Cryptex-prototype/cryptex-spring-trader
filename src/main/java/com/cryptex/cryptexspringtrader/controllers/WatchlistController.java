package com.cryptex.cryptexspringtrader.controllers;

import com.cryptex.cryptexspringtrader.models.CoinData;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.cryptex.cryptexspringtrader.models.User;
import com.cryptex.cryptexspringtrader.models.Watchlist;
import com.cryptex.cryptexspringtrader.repositories.CoinDataRepository;
import com.cryptex.cryptexspringtrader.repositories.UserRepository;
import com.cryptex.cryptexspringtrader.repositories.WatchlistRepository;
import com.cryptex.cryptexspringtrader.services.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.cryptex.cryptexspringtrader.repositories.CoinDataRepository;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/watchlists")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WatchlistRepository watchlistRepository;
    @Autowired
    private CoinDataRepository coinDataRepository;


    @GetMapping
    public ResponseEntity<List<Watchlist>> getAllWatchlists() {
        List<Watchlist> watchlists = watchlistService.getAllWatchlists();
        return new ResponseEntity<>(watchlists, HttpStatus.OK);
    }


//    @PostMapping
//    public ResponseEntity<Void> createWatchlist(@RequestBody Watchlists watchlists) {
//        Watchlist watchlist = new Watchlist();
//        watchlist.setName(watchlists.getName());
//
//        List<com.cryptex.cryptexspringtrader.models.CoinData> coinDataList = watchlists.getCoinDataList().stream()
//                .map(coin -> coinDataRepository.findByApiId(coin.getApiId()))
//                .filter(coinData -> coinData != null)
//                .collect(Collectors.toList());
//
//        watchlist.setCoinDataList(coinDataList);
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//
//        watchlistService.createWatchlistForUser(watchlist, userDetails);
//
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }

    @PostMapping
    public ResponseEntity<Void> createWatchlist(@RequestBody Watchlists watchlists) {
        Watchlist watchlist = new Watchlist();
        watchlist.setName(watchlists.getName());

        List<com.cryptex.cryptexspringtrader.models.CoinData> coinDataList = watchlists.getCoinDataList().stream()
                .map(coin -> {
                    System.out.println("Looking for coin with apiId: " + coin.getApiId());
                    com.cryptex.cryptexspringtrader.models.CoinData coinData = coinDataRepository.findByApiId(coin.getApiId());
                    if (coinData == null) {
                        System.out.println("Saving new CoinData with apiId: " + coin.getApiId());
                        coinData = new com.cryptex.cryptexspringtrader.models.CoinData(coin.getApiId());
                        coinDataRepository.save(coinData);
                    } else {
                        System.out.println("CoinData with apiId: " + coin.getApiId() + " already exists");
                    }
                    return coinData;
                })
                .collect(Collectors.toList());

        watchlist.setCoinDataList(coinDataList);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        watchlistService.createWatchlistForUser(watchlist, userDetails);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping("/watchlist/{id}")
    public ResponseEntity<?> getWatchlistById(@PathVariable Long id) {
        Optional<Watchlist> watchlist = watchlistService.getWatchlistById(id);
        return watchlist.isPresent() ? ResponseEntity.ok(watchlist.get()) : ResponseEntity.notFound().build();
    }


    public static class Watchlists {

        private String name;
        private User user;
        private List<CoinData> coinDataList;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        @Override
        public String toString() {
            return "WatchlistData{" +
                    "name='" + name + '\'' +
                    ", coinDataList=" + coinDataList +
                    '}';
        }

        public List<CoinData> getCoinDataList() {

            return coinDataList;
        }

        public void setCoinDataList(List<CoinData> coinDataList) {
            this.coinDataList = coinDataList;
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }
    }

    public static class CoinData {
        //        private Long id;
        private String apiId;

        @Override
        public String toString() {
            return "CoinData{" +
                    "apiId='" + apiId + '\'' +
                    '}';
        }

        public String getApiId() { // Change this from getApi_ID to getApiId
            return apiId;
        }

        public void setApiId(String apiId) { // Change this from setApi_ID to setApiId
            this.apiId = apiId;
        }


        @JsonCreator
        public CoinData(@JsonProperty("id") String apiId) {
            this.apiId = apiId;
        }
//        public CoinData( String apiId) {
//            this.id = id;
//            this.apiId = apiId;
//        }

//        public Long getId() {
//            return id;
//        }
//
//        public void setId(Long id) {
//            this.id = id;
//        }
    }
}





