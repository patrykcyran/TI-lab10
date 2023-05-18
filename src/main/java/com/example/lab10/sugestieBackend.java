package com.example.lab10;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "sugestieBackend", value = "/sugestieBackend")
public class sugestieBackend extends HttpServlet {
    String[] lista = { "ALFA ROMEO", "AUDI", "BMW", "CHRYSLER", "CITROEN", "DAIHATSU", "FIAT", "FORD", "HONDA", "ISUZU", "JAGUAR", "LADA", "LANCIA", "MAZDA", "MERCEDES", "MITSUBISHI", "NISSAN", "OPEL", "PEUGEOT", "PORSCHE", "RENAULT", "ROVER", "SAAB", "SEAT", "SKODA", "SUBARU", "SUZUKI", "TOYOTA", "VOLVO", "VW" };

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("utf-8");
        String query = ""+request.getParameter("wartosc");

        try (PrintWriter out = response.getWriter()) {
            for (String samochod : lista) {
                if (samochod.startsWith(query)) {
                    out.println("<div class='lista'>" + samochod + "</div>");
                }
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
