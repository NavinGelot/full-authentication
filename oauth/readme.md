
# com.auth
## config
#### SecurityConfig.java

    This class has responsibility of handling which resources
    should be accessible by which rest endpoint
    
    It uses JwtAuthenticationEntryPoint class, if any request
    fail with authorization header not available or
     invalid will through 401 error
    
    CustomUserDetailsService class has main responsibility 
    to implements UserDetailsService and override method
    this overide method will be used when user log in
    
    
#### WebMvcConfig.java
    
    This class has simple responsibility of cors management
    in SecurityConfig.java has http.cors().and....
    will enable cors by spring security
    
#### AuthenticationController.java
    
    This controller will be responsible for 
    handling signin and signup request
    
```sql
use database oauth;
drop table roles;
drop table users;
drop table user_roles;

create table roles(id int(10) primary key auto_increment, name varchar(50));

create table users(
id int(10) primary key auto_increment, 
name varchar(50), 
username varchar(15) unique, 
email varchar(40) unique, 
password varchar(100), 
createdAt timestamp null, 
updatedAt timestamp null);


create table user_roles  (user_id int(10) references users(id), role_id int(10) references roles(id), primary key (user_id, role_id));

 insert into roles (name) values ('ROLE_ADMIN');

 insert into roles (name) values ('ROLE_USER');
```

#### payload package
    
       This package contains basic class for request, response and
       exception handling
       
#### repository package

    This package contains jpa repository for handling persistent
    storage

## security package 
  #### CustomUserDetailsService.java
    
    This class UserDetailsService implement UserDetailsService.java
    interface
    
    This class override loadUserByUsername() method which will take 
    our custom logic.
    
    When following code executes from /signin endpoint it will call 
    loadUserByUsername() method as in securityConfig we had given
    this class (CustomUserDetailsService) in a configuration 

```java
Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsernameOrEmail(),
                        loginDTO.getPassword()
                )
        );
```

#### JwtAuthenticationEntryPoint.java

    Any request (endpoint) which is not configured in SecurityConfig.java
    and request come  without header will run (commence) this class method
    
#### JwtAuthenticationFilter.java
      
    This filter will execute for every request (authenticated() & permitAll()).
    
    It has responsibility of validate a token and fall back to 
    actual request when doFilter calls.
    
#### UserPrincipal.java
    
    This class override methods from UserDetails class.
    
    This method will be used by Authentication reference to call
    getPrincipal and getCredentials like method...
    
#### JwtTokenProvider.java
    
    This is utility class which will be responsible for 
    handling jwt related information, for it 
    
    
         

 


    

    





    
    
    
