package com.cryptex.cryptexspringtrader.models;

 import com.fasterxml.jackson.annotation.JsonIgnore;
 import jakarta.persistence.*;
 import jakarta.validation.constraints.Email;
 import jakarta.validation.constraints.NotBlank;
 import jakarta.validation.constraints.Pattern;
 import jakarta.validation.constraints.Size;

 import java.util.List;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
@JsonIgnore
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email address")
    @Column(nullable = false, length = 50, unique=true)
    private String email;
@JsonIgnore
    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    @Column(nullable = false, length = 100)
    private String password;
    @NotBlank(message = "Username cannot be empty")
    @Column(nullable = false, length = 50, unique=true)
    private String username;

    @JsonIgnore
    @NotBlank(message = "Phone number cannot be empty")
//    @Pattern(regexp = "^\\+(?:[0-9] ?){6,14}[0-9]$", message = "Invalid phone number")
    @Column(nullable = false, length = 20)
    private String phonenumber;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Watchlist> watchlists;

    // Getters, setters, and constructors

    public User(User copy) {
        id = copy.id; // This line is SUPER important! Many things won't work if it's absent
        email = copy.email;
        username = copy.username;
        password = copy.password;
        phonenumber = copy.phonenumber;
    }


    public User(String email, String password, String username, String phonenumber) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.phonenumber = phonenumber;

    }

    public User(String email, String username, String phonenumber) {
        this.email = email;
        this.username = username;
        this.phonenumber = phonenumber;

    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setWatchlists(List<Watchlist> watchlists) {
        this.watchlists = watchlists;
    }

    public List<Watchlist> getWatchlists() {
        return watchlists;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenumber(){ return phonenumber; }
    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }
}
