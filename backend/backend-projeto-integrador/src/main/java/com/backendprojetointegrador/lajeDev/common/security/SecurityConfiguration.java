package com.backendprojetointegrador.lajeDev.common.security;

import com.backendprojetointegrador.lajeDev.api.security.FilterToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private FilterToken filter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                    .csrf()
                        .disable()

                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                    .and()
                        .authorizeHttpRequests()
                            .requestMatchers(HttpMethod.POST, "/usuarios")
                                .permitAll()
                            .requestMatchers(HttpMethod.POST, "/login")
                                .permitAll()
                            .anyRequest()
                                .authenticated()
                    .and()
                        .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                    .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


}
