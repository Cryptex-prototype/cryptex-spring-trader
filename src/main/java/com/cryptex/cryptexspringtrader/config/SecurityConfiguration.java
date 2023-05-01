////
////package com.cryptex.cryptexspringtrader.config;
////
////import com.cryptex.cryptexspringtrader.services.UserDetailsLoader;
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.security.web.SecurityFilterChain;
////
////
////@Configuration
////@EnableWebSecurity
////public class SecurityConfiguration {
////
////    private UserDetailsLoader usersLoader;
////
////    public SecurityConfiguration(UserDetailsLoader usersLoader) {
////        this.usersLoader = usersLoader;
////    }
////
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
////
////    @Bean
////    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
////        return authenticationConfiguration.getAuthenticationManager();
////    }
////
////
////    @Bean
////    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
////        http
////
////                /* Login configuration */
////                .formLogin()
////                .loginPage("/login")
////                .defaultSuccessUrl("/overview") // user's home page, it can be any URL
////                .permitAll() // Anyone can go to the login page
////                /* Logout configuration */
////                .and()
////                .logout()
////                .logoutSuccessUrl("/") // append a query string value
////                /* Pages that require authentication */
////                .and()
////                .authorizeHttpRequests()
////                .requestMatchers(
////                        "/profile", // only authenticated users can create ads
////                        "/logout", "/dashboard", "/api/dashboard/", "/api/watchlists","/api/watchlists/*","/api/dashboard/**" // only authenticated users can edit ads
////                )
////                .authenticated()
////                /* Pages that can be viewed without having to log in */
////                .and()
////                .authorizeHttpRequests()
////
////                .requestMatchers("/", "/sign-up", "/creators", "/index", "/market", "/tutorial", "/css/**", "/js/**","/images/**","jquery-plugins/**", "/mockdb/**","/api/watchlists/**","/api/watchlists/marketcap","/REST/","/REST/**","/REST/watchlists/marketcap","/overview","/lesson-1","/lesson-2","/lesson-3","/lesson-4","/lesson-5","/about-us") // anyone can see home, the ads pages, and sign up
////
////                .permitAll()
////        ;
////
////        return http.build();
////    }
////}
////
////
////    //    protected void configure(HttpSecurity http) throws Exception {
//////        http.authorizeRequests()
//////                .antMatchers("/images/**").permitAll()
//////                .anyRequest().authenticated()
//////                .and()
//////                .formLogin()
//////                .and()
//////                .httpBasic();
//////    }
//////}
//////    @Bean
//////    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//////        http.authorizeHttpRequests()
//////                .anyRequest().permitAll()
//////                .and().formLogin()
//////                .and().httpBasic();
//////        return http.build();
//////    }
//////}
////
//package com.cryptex.cryptexspringtrader.config;
//
//import com.cryptex.cryptexspringtrader.services.UserDetailsLoader;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
//
//@Configuration
//@EnableWebSecurity
//public class  SecurityConfiguration {
//
//    private UserDetailsLoader usersLoader;
//
//    public SecurityConfiguration(UserDetailsLoader usersLoader) {
//        this.usersLoader = usersLoader;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
////        http.headers().disable();
//        http.cors().disable()
////                .csrf()
////                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
////                .and()
//
//                .csrf().ignoringRequestMatchers("/api/watchlists","/databaseTester")
//                               .and()
//
//                /* Login configuration */
////                .and()
//                .formLogin()
//                .loginPage("/login")
//                .defaultSuccessUrl("/overview") // user's home page, it can be any URL
//                .permitAll() // Anyone can go to the login page
//                /* Logout configuration */
//                .and()
//                .logout()
//                .logoutSuccessUrl("/") // append a query string value
//                /* Pages that require authentication */
//                .and()
//                .authorizeHttpRequests()
//                .requestMatchers(
//                        "/profile", // only authenticated users can create ads
//                        "/logout", "/dashboard","/api/dashboard/**","/api/watchlists/**" // only authenticated users can edit ads
//                )
//                .authenticated()
//                /* Pages that can be viewed without having to log in */
//                .and()
//                .authorizeHttpRequests()
//
//                .requestMatchers("/","/databaseTester", "/api/watchlists","/api/watchlists/**", "/sign-up", "/creators", "/index", "/market", "/tutorial", "/css/**", "/js/**","/images/**","jquery-plugins/**", "/mockdb/**","/REST/","/REST/**","/REST/watchlists/marketcap","/overview","/lesson-1","/lesson-2","/lesson-3","/lesson-4","/lesson-5","/about-us") // anyone can see home, the ads pages, and sign up
//
//                .permitAll()
//        ;
//
//        return http.build();
//    }
//}

//
//package com.cryptex.cryptexspringtrader.config;
//
//import com.cryptex.cryptexspringtrader.services.UserDetailsLoader;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//
//    private UserDetailsLoader usersLoader;
//
//    public SecurityConfiguration(UserDetailsLoader usersLoader) {
//        this.usersLoader = usersLoader;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
//
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//
//                /* Login configuration */
//                .formLogin()
//                .loginPage("/login")
//                .defaultSuccessUrl("/overview") // user's home page, it can be any URL
//                .permitAll() // Anyone can go to the login page
//                /* Logout configuration */
//                .and()
//                .logout()
//                .logoutSuccessUrl("/") // append a query string value
//                /* Pages that require authentication */
//                .and()
//                .authorizeHttpRequests()
//                .requestMatchers(
//                        "/profile", // only authenticated users can create ads
//                        "/logout", "/dashboard", "/api/dashboard/", "/api/watchlists","/api/watchlists/*","/api/dashboard/**" // only authenticated users can edit ads
//                )
//                .authenticated()
//                /* Pages that can be viewed without having to log in */
//                .and()
//                .authorizeHttpRequests()
//
//                .requestMatchers("/", "/sign-up", "/creators", "/index", "/market", "/tutorial", "/css/**", "/js/**","/images/**","jquery-plugins/**", "/mockdb/**","/api/watchlists/**","/api/watchlists/marketcap","/REST/","/REST/**","/REST/watchlists/marketcap","/overview","/lesson-1","/lesson-2","/lesson-3","/lesson-4","/lesson-5","/about-us") // anyone can see home, the ads pages, and sign up
//
//                .permitAll()
//        ;
//
//        return http.build();
//    }
//}
//
//
//    //    protected void configure(HttpSecurity http) throws Exception {
////        http.authorizeRequests()
////                .antMatchers("/images/**").permitAll()
////                .anyRequest().authenticated()
////                .and()
////                .formLogin()
////                .and()
////                .httpBasic();
////    }
////}
////    @Bean
////    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
////        http.authorizeHttpRequests()
////                .anyRequest().permitAll()
////                .and().formLogin()
////                .and().httpBasic();
////        return http.build();
////    }
////}
//
package com.cryptex.cryptexspringtrader.config;

import com.cryptex.cryptexspringtrader.services.UserDetailsLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class  SecurityConfiguration {

    private UserDetailsLoader usersLoader;

    public SecurityConfiguration(UserDetailsLoader usersLoader) {
        this.usersLoader = usersLoader;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                /* Login configuration */
                .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/overview") // user's home page, it can be any URL
                .permitAll() // Anyone can go to the login page
                /* Logout configuration */
                .and()
                .logout()
                .logoutSuccessUrl("/") // append a query string value
                /* Pages that require authentication */
                .and()
                .authorizeHttpRequests()
                .requestMatchers(
                        "/profile", // only authenticated users can create ads
                        "/logout", "/dashboard/**", "/api/dashboard/", "/api/watchlists","/api/watchlists/**","/api/dashboard/**" // only authenticated users can edit ads
                )
                .authenticated()
                /* Pages that can be viewed without having to log in */
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/", "/sign-up", "/creators", "/index", "/market", "/tutorial", "/css/**", "/js/**","/images/**","jquery-plugins/**", "/mockdb/**","/REST/","/REST/**","/REST/watchlists/marketcap","/overview","/lesson-1","/lesson-2","/lesson-3","/lesson-4","/lesson-5","/about-us") // anyone can see home, the ads pages, and sign up
                .permitAll()
        ;

        return http.build();
    }
}
