package com.example.lab10;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.ArrayList;

@WebServlet(name = "sugestie", value = "/sugestie")
public class sugestieBackend extends HttpServlet {
    String[] lista = { "ALFA ROMEO", "AUDI", "BMW", "CHRYSLER", "CITROEN", "DAIHATSU", "FIAT", "FORD", "HONDA", "ISUZU", "JAGUAR", "LADA", "LANCIA", "MAZDA", "MERCEDES", "MITSUBISHI", "NISSAN", "OPEL", "PEUGEOT", "PORSCHE", "RENAULT", "ROVER", "SAAB", "SEAT", "SKODA", "SUBARU", "SUZUKI", "TOYOTA", "VOLVO", "VW" };

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        request.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();

        Reader wejscie = new InputStreamReader(request.getInputStream());
        JSONObject json = new JSONObject();
        JSONParser jsonParser = new JSONParser();

        try {
            json = (JSONObject) jsonParser.parse(wejscie);
        } catch (ParseException e) {
            json = new JSONObject();
        }

        String query = (String) json.get("wartosc");
        ArrayList<String> sugestia = new ArrayList<>();
        try {
            for (String samochod: lista) {
                if (samochod.startsWith(query)) {
                    sugestia.add(samochod);
                }
            }
            json.put("sugestia", sugestia);
        } finally {
            out.println(json.toJSONString());
            out.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
