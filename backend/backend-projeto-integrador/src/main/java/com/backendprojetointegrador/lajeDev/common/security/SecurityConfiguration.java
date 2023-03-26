package com.backendprojetointegrador.lajeDev.common.security;

import com.backendprojetointegrador.lajeDev.api.security.FilterToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private FilterToken filterToken;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                    .cors(Customizer.withDefaults())

                    .csrf()
                        .disable()

                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                    .and()
                        .authorizeHttpRequests()
                            .requestMatchers(HttpMethod.POST, "/usuarios/**")
                                .permitAll()

                            .requestMatchers(HttpMethod.POST, "/login")
                                .permitAll()

                            .requestMatchers(HttpMethod.GET, "/caracteristicas/**")
                                .permitAll()

                            .requestMatchers(HttpMethod.GET, "/categorias/**")
                                .permitAll()

                            .requestMatchers(HttpMethod.GET, "/cidades/**")
                                .permitAll()

                            .requestMatchers(HttpMethod.GET, "/produtos/**")
                                .permitAll()

                            .requestMatchers(HttpMethod.GET, "/reservas/**")
                                .permitAll()

                            .anyRequest()
                                .authenticated()
                    .and()
                        .addFilterBefore(filterToken, UsernamePasswordAuthenticationFilter.class)
                    .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
