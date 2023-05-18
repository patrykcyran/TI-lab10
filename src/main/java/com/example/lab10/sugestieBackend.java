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
        response.setContentType("text/xml");
        response.setCharacterEncoding("utf-8");
        request.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();

        String query = ""+request.getParameter("wartosc");

        out.println("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
        out.println("<sugestie>");

        try {
            for (String samochod : lista) {
                if (samochod.startsWith(query)) {
                    out.print("   <sugestia>");
                    out.print(samochod);
                    out.println("</sugestia>");
                }
            }
        } finally {
            out.println("</sugestie>");
            out.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
