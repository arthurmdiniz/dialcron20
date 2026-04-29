/*
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package principal.DAO;

import principal.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author arthurmdiniz
 */
public class ClienteDAO {
    public Object[] buscarClientePorID(int id) {
        String sql = "SELECT * FROM MED_MEDICO WHERE ID = ?";

        try (Connection conexao = Conexao.getConexao(); PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setInt(1,id);      
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Object[] clientes = new Object[11];          
                clientes[0] = rs.getInt("ID");
                clientes[1] = rs.getString("NOME");
                clientes[2] = rs.getString("LOGRADOURO"); 
                clientes[3] = rs.getDate("DTA_NASCIMENTO");
                clientes[4] = rs.getInt("TELEFONE_DDD");
                clientes[5] = rs.getInt("TELEFONE");
                clientes[7] = rs.getInt("CELULAR_DDD");
                clientes[8] = rs.getInt("CELULAR");

                return clientes;
             }
            
        } catch (SQLException e) {
            System.err.println("Erro ao buscar clientes: " + e.getMessage());
        }
        
        return null;
    }
    
    public int calcularIdade(java.util.Date dataNascimento) {
        if (dataNascimento == null) return 0;
        java.util.Calendar nasc = java.util.Calendar.getInstance();
        nasc.setTime(dataNascimento);
        java.util.Calendar hoje = java.util.Calendar.getInstance();
        int idade = hoje.get(java.util.Calendar.YEAR) - nasc.get(java.util.Calendar.YEAR);
        
        if (hoje.get(java.util.Calendar.MONTH) < nasc.get(java.util.Calendar.MONTH) ||
            (hoje.get(java.util.Calendar.MONTH) == nasc.get(java.util.Calendar.MONTH) && 
             hoje.get(java.util.Calendar.DAY_OF_MONTH) < nasc.get(java.util.Calendar.DAY_OF_MONTH))) {
            idade--;
        }
        
        return idade;
    }
    

    
}
