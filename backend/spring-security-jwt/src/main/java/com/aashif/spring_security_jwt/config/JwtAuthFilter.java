package com.aashif.spring_security_jwt.config;


import com.aashif.spring_security_jwt.service.MyUserDetailsService;
import com.aashif.spring_security_jwt.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter
{
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private  ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

       final String header = request.getHeader("Authorization");
       String username = null;
       String jwtToken = null;

       if (header != null && header.startsWith("Bearer "))
       {
           jwtToken = header.substring(7);

           try{
            username = jwtUtil.getUserNameFromToken(jwtToken);

           } catch (IllegalArgumentException e) {
               System.out.println("Unable to get jwt token");
           } catch (Throwable e) {
               System.out.println("Jwt token is expired");
           }
       } else
       {
           System.out.println("Jwt token is in valid");
       }

       if (username != null && SecurityContextHolder.getContext().getAuthentication() == null)
       {
           UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(username);

           if (jwtUtil.validateToken(jwtToken,userDetails))
           {
               UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                       new UsernamePasswordAuthenticationToken(
                       userDetails,
                       null,
                       userDetails.getAuthorities());

               usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
               SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
           }
       }
       filterChain.doFilter(request, response);
    }
}
