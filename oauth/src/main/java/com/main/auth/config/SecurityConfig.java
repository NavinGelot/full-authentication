package com.main.auth.config;

import com.main.auth.security.CustomUserDetailsService;
import com.main.auth.security.JwtAuthenticationEntryPoint;
import com.main.auth.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity  // This is the primary spring security annotation that is used to enable web security in a project.
@EnableGlobalMethodSecurity( // This is used to enable method level security based on annotations
        /**
         * securedEnabled: It enables the @Secured annotation using which you can protect your controller/service methods like so
         *
         * @Secured("ROLE_ADMIN")
         * public User getAllUsers() {}
         *
         * @Secured({"ROLE_USER", "ROLE_ADMIN"})
         * public User getUser(Long id) {}
         *
        */
        securedEnabled = true,

        /**
         * jsr250Enabled: It enables the @RolesAllowed annotation that can be used like this
         *
         * @RolesAllowed("ROLE_ADMIN")
         * public Poll createPoll() {}
         *
        */
        jsr250Enabled = true,

        /**
         *
         * It enables more complex expression based access control syntax with @PreAuthorize and @PostAuthorize annotations -
         *
         * @PreAuthorize("isAnonymous()")
         * public boolean isUsernameAvailable() {}
         *
         * @PreAuthorize("hasRole('USER')")
         * public Poll createPoll() {}
         *
        */
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
//                .antMatchers("/",
//                        "/favicon.ico",
//                        "/**/*.png",
//                        "/**/*.gif",
//                        "/**/*.svg",
//                        "/**/*.jpg",
//                        "/**/*.html",
//                        "/**/*.css",
//                        "/**/*.js").permitAll()
                .antMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated();

        // Add our custom JWT security filter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    }
}
