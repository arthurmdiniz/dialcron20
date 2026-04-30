/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JPanel.java to edit this template
 */
package principal.arquivo;


import java.awt.Component;
import java.util.List;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;
import principal.DAO.EmpresaDAO;
import javax.swing.table.DefaultTableModel;
import javax.swing.event.ListSelectionListener;
import javax.swing.event.ListSelectionEvent;
import principal.FuncoesGerais;

/**
 *
 * @author arthurmdiniz
 */
public class frmCadastroEmpresa extends javax.swing.JPanel {
    private EmpresaDAO empresaDAO;
    private DefaultTableModel tableModel;
    private boolean Inserindo = false;

    /**
     * Creates new form CadastroPaciente
     */
    public frmCadastroEmpresa() {
        //TemaPersonalizado.aplicarIcone(this);
        initComponents();
        this.setPreferredSize(new java.awt.Dimension(650, 446));
        FuncoesGerais.preencherComboUF(cbxUF);
        
        empresaDAO = new EmpresaDAO();
        inicializarTabela();
        carregarUnidadesNaTabela();
        adicionarListenerTabela();
        carregarUnidadeSelecionada();
    }
    
    private void adicionarListenerTabela() {
        tblUnidades.getSelectionModel().addListSelectionListener(new javax.swing.event.ListSelectionListener() {
            @Override
            public void valueChanged(javax.swing.event.ListSelectionEvent e) {
                // Verifica se a seleção ainda está em andamento (evita múltiplos eventos)
                if (e.getValueIsAdjusting()) {
                    return;
                }

                int linhaSelecionada = tblUnidades.getSelectedRow();

                if (linhaSelecionada != -1) {
                    carregarUnidadeSelecionada();
                }
            }
        });
    }

    private void inicializarTabela() {
        tableModel = new DefaultTableModel(
            new Object[][]{},
            new String[]{"ID", "NOME FANTASIA"}
        ) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false; // não editár celula
            }
        };
        tblUnidades.setModel(tableModel);
    }

    private void carregarUnidadesNaTabela() {
        Inserindo = false;
        try {
            List<Object[]> unidades = empresaDAO.listarUnidades();
            tableModel.setRowCount(0); // Limpa a tabela

            for (Object[] unidade : unidades) {
                tableModel.addRow(unidade);
            }
        } catch (Exception e) {
            FuncoesGerais.msgErro("Erro ao carregar unidades: " + e.getMessage());
        }
    }

    private void carregarUnidadeSelecionada() {
        int linhaSelecionada = tblUnidades.getSelectedRow();

        if (linhaSelecionada == -1) {
            if (tblUnidades.getRowCount() > 0) {
                tblUnidades.setRowSelectionInterval(0, 0);
                linhaSelecionada = 0;
        } else {
                FuncoesGerais.msgAviso("A tabela está vazia!\nNão há unidades para carregar.");
                return;
            }
        }

        try {
            int id = (Integer) tableModel.getValueAt(linhaSelecionada, 0);
            Object[] unidade = empresaDAO.buscarUnidadePorId(id);

            if (unidade != null) {
                preencherCampos(unidade);
            } else {
                FuncoesGerais.msgErro("Unidade não encontrada!");
  
            }
        } catch (Exception e) {
            FuncoesGerais.msgErro("Erro ao carregar unidade: " + e.getMessage());
        }

    }

    private void preencherCampos(Object[] unidade) {
        txtID.setText(unidade[0] != null ? unidade[0].toString() : "");
        txtCliente.setText(unidade[1] != null ? unidade[1].toString() : "");
        txtNomeFantasia.setText(unidade[2] != null ? unidade[2].toString() : "");
        txtRazaoSocial.setText(unidade[3] != null ? unidade[3].toString() : "");
        txtCNPJ.setText(unidade[4] != null ? unidade[4].toString() : "");
        txtIE.setText(unidade[5] != null ? unidade[5].toString() : "");
        txtIM.setText(unidade[6] != null ? unidade[6].toString() : "");
        txtCEP.setText(unidade[7] != null ? unidade[7].toString() : "");
        txtEndereco.setText(unidade[8] != null ? unidade[8].toString() : "");
        txtNumero.setText(unidade[9] != null ? unidade[9].toString() : "");
        txtBairro.setText(unidade[10] != null ? unidade[10].toString() : "");
        txtComplemento.setText(unidade[11] != null ? unidade[11].toString() : "");
        txtMunicipio.setText(unidade[12] != null ? unidade[12].toString() : "");
        if (unidade[13] != null) {
            cbxUF.setSelectedItem(unidade[13].toString());
        }
        txtPais.setText(unidade[14] != null ? unidade[14].toString() : "");
        txtEmail.setText(unidade[15] != null ? unidade[15].toString() : "");
        txtDDD.setText(unidade[16] != null ? unidade[16].toString() : "");
        txtTelefone.setText(unidade[17] != null ? unidade[17].toString() : "");
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        jLabel8 = new javax.swing.JLabel();
        txtNomeFantasia = new javax.swing.JTextField();
        jLabel9 = new javax.swing.JLabel();
        jLabel10 = new javax.swing.JLabel();
        jLabel11 = new javax.swing.JLabel();
        jLabel12 = new javax.swing.JLabel();
        jLabel13 = new javax.swing.JLabel();
        jLabel14 = new javax.swing.JLabel();
        jLabel15 = new javax.swing.JLabel();
        jLabel16 = new javax.swing.JLabel();
        jLabel20 = new javax.swing.JLabel();
        jLabel21 = new javax.swing.JLabel();
        jLabel22 = new javax.swing.JLabel();
        txtID = new javax.swing.JTextField();
        txtCliente = new javax.swing.JTextField();
        txtRazaoSocial = new javax.swing.JTextField();
        txtCNPJ = new javax.swing.JTextField();
        txtIE = new javax.swing.JTextField();
        txtIM = new javax.swing.JTextField();
        txtCEP = new javax.swing.JTextField();
        txtEndereco = new javax.swing.JTextField();
        txtNumero = new javax.swing.JTextField();
        txtBairro = new javax.swing.JTextField();
        txtComplemento = new javax.swing.JTextField();
        txtMunicipio = new javax.swing.JTextField();
        txtPais = new javax.swing.JTextField();
        cbxUF = new javax.swing.JComboBox<>();
        txtEmail = new javax.swing.JTextField();
        txtDDD = new javax.swing.JTextField();
        txtTelefone = new javax.swing.JTextField();
        jScrollPane1 = new javax.swing.JScrollPane();
        tblUnidades = new javax.swing.JTable();
        pnBotoes = new javax.swing.JPanel();
        btnSalvar = new javax.swing.JButton();
        btnFechar = new javax.swing.JButton();

        setMaximumSize(getPreferredSize());
        setMinimumSize(getPreferredSize());
        setPreferredSize(new java.awt.Dimension(650, 446));

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel1.setText("Dados da empresa");

        jLabel2.setText("Unidade:");
        jLabel2.setAlignmentY(0.0F);

        jLabel3.setHorizontalAlignment(javax.swing.SwingConstants.LEFT);
        jLabel3.setText("Cliente:");
        jLabel3.setAlignmentY(0.0F);

        jLabel4.setText("Nome Fantasia:");
        jLabel4.setAlignmentY(0.0F);

        jLabel5.setText("Razão Social:");
        jLabel5.setAlignmentY(0.0F);

        jLabel6.setText("CNPJ:");
        jLabel6.setAlignmentY(0.0F);

        jLabel7.setText("InscriçãoEstadual:");
        jLabel7.setAlignmentY(0.0F);

        jLabel8.setText("Inscrição Municipal:");
        jLabel8.setAlignmentY(0.0F);

        txtNomeFantasia.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtNomeFantasia.setMaximumSize(getPreferredSize());
        txtNomeFantasia.setMinimumSize(getPreferredSize());
        txtNomeFantasia.setPreferredSize(new java.awt.Dimension(7, 24));
        txtNomeFantasia.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtNomeFantasiaActionPerformed(evt);
            }
        });

        jLabel9.setText("CEP:");
        jLabel9.setAlignmentY(0.0F);

        jLabel10.setText("Logradouro:");
        jLabel10.setAlignmentY(0.0F);

        jLabel11.setText("Nro:");
        jLabel11.setAlignmentY(0.0F);

        jLabel12.setText("Bairro:");
        jLabel12.setAlignmentY(0.0F);

        jLabel13.setText("Complemento");
        jLabel13.setAlignmentY(0.0F);

        jLabel14.setText("Município:");
        jLabel14.setAlignmentY(0.0F);

        jLabel15.setText("UF:");
        jLabel15.setAlignmentY(0.0F);

        jLabel16.setText("País");
        jLabel16.setAlignmentY(0.0F);

        jLabel20.setText("E-mail");
        jLabel20.setAlignmentY(0.0F);

        jLabel21.setText("DDD:");
        jLabel21.setAlignmentY(0.0F);

        jLabel22.setText("Telefone:");
        jLabel22.setAlignmentY(0.0F);

        txtID.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtID.setMaximumSize(getPreferredSize());
        txtID.setMinimumSize(getPreferredSize());
        txtID.setPreferredSize(new java.awt.Dimension(7, 24));
        txtID.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtIDActionPerformed(evt);
            }
        });

        txtCliente.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtCliente.setMaximumSize(getPreferredSize());
        txtCliente.setMinimumSize(getPreferredSize());
        txtCliente.setPreferredSize(new java.awt.Dimension(7, 24));
        txtCliente.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtClienteActionPerformed(evt);
            }
        });

        txtRazaoSocial.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtRazaoSocial.setMaximumSize(getPreferredSize());
        txtRazaoSocial.setMinimumSize(getPreferredSize());
        txtRazaoSocial.setPreferredSize(new java.awt.Dimension(7, 24));
        txtRazaoSocial.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtRazaoSocialActionPerformed(evt);
            }
        });

        txtCNPJ.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtCNPJ.setMaximumSize(getPreferredSize());
        txtCNPJ.setMinimumSize(getPreferredSize());
        txtCNPJ.setPreferredSize(new java.awt.Dimension(7, 24));
        txtCNPJ.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtCNPJActionPerformed(evt);
            }
        });

        txtIE.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtIE.setMaximumSize(getPreferredSize());
        txtIE.setMinimumSize(getPreferredSize());
        txtIE.setPreferredSize(new java.awt.Dimension(7, 24));
        txtIE.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtIEActionPerformed(evt);
            }
        });

        txtIM.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtIM.setMaximumSize(getPreferredSize());
        txtIM.setMinimumSize(getPreferredSize());
        txtIM.setPreferredSize(new java.awt.Dimension(7, 24));
        txtIM.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtIMActionPerformed(evt);
            }
        });

        txtCEP.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtCEP.setMaximumSize(getPreferredSize());
        txtCEP.setMinimumSize(getPreferredSize());
        txtCEP.setPreferredSize(new java.awt.Dimension(7, 24));
        txtCEP.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtCEPActionPerformed(evt);
            }
        });

        txtEndereco.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtEndereco.setMaximumSize(getPreferredSize());
        txtEndereco.setMinimumSize(getPreferredSize());
        txtEndereco.setPreferredSize(new java.awt.Dimension(7, 24));
        txtEndereco.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtEnderecoActionPerformed(evt);
            }
        });

        txtNumero.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtNumero.setMaximumSize(getPreferredSize());
        txtNumero.setMinimumSize(getPreferredSize());
        txtNumero.setPreferredSize(new java.awt.Dimension(7, 24));
        txtNumero.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtNumeroActionPerformed(evt);
            }
        });

        txtBairro.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtBairro.setMaximumSize(getPreferredSize());
        txtBairro.setMinimumSize(getPreferredSize());
        txtBairro.setPreferredSize(new java.awt.Dimension(7, 24));
        txtBairro.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtBairroActionPerformed(evt);
            }
        });

        txtComplemento.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtComplemento.setMaximumSize(getPreferredSize());
        txtComplemento.setMinimumSize(getPreferredSize());
        txtComplemento.setPreferredSize(new java.awt.Dimension(7, 24));
        txtComplemento.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtComplementoActionPerformed(evt);
            }
        });

        txtMunicipio.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtMunicipio.setMaximumSize(getPreferredSize());
        txtMunicipio.setMinimumSize(getPreferredSize());
        txtMunicipio.setPreferredSize(new java.awt.Dimension(7, 24));
        txtMunicipio.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtMunicipioActionPerformed(evt);
            }
        });

        txtPais.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtPais.setMaximumSize(getPreferredSize());
        txtPais.setMinimumSize(getPreferredSize());
        txtPais.setPreferredSize(new java.awt.Dimension(7, 24));
        txtPais.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtPaisActionPerformed(evt);
            }
        });

        txtEmail.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtEmail.setMaximumSize(getPreferredSize());
        txtEmail.setMinimumSize(getPreferredSize());
        txtEmail.setPreferredSize(new java.awt.Dimension(7, 24));
        txtEmail.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtEmailActionPerformed(evt);
            }
        });

        txtDDD.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtDDD.setMaximumSize(getPreferredSize());
        txtDDD.setMinimumSize(getPreferredSize());
        txtDDD.setPreferredSize(new java.awt.Dimension(7, 24));
        txtDDD.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtDDDActionPerformed(evt);
            }
        });

        txtTelefone.setMargin(new java.awt.Insets(0, 2, 0, 2));
        txtTelefone.setMaximumSize(getPreferredSize());
        txtTelefone.setMinimumSize(getPreferredSize());
        txtTelefone.setPreferredSize(new java.awt.Dimension(7, 24));
        txtTelefone.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtTelefoneActionPerformed(evt);
            }
        });

        tblUnidades.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null},
                {null, null},
                {null, null},
                {null, null}
            },
            new String [] {
                "ID", "NOME FANTASIA"
            }
        ));
        jScrollPane1.setViewportView(tblUnidades);

        btnSalvar.setText("Salvar");
        btnSalvar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnSalvarActionPerformed(evt);
            }
        });

        btnFechar.setText("Fechar");
        btnFechar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnFecharActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout pnBotoesLayout = new javax.swing.GroupLayout(pnBotoes);
        pnBotoes.setLayout(pnBotoesLayout);
        pnBotoesLayout.setHorizontalGroup(
            pnBotoesLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(pnBotoesLayout.createSequentialGroup()
                .addGap(62, 62, 62)
                .addComponent(btnSalvar)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(btnFechar)
                .addContainerGap(80, Short.MAX_VALUE))
        );
        pnBotoesLayout.setVerticalGroup(
            pnBotoesLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(btnFechar, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addComponent(btnSalvar, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(6, 6, 6)
                        .addComponent(jLabel1)
                        .addGap(0, 482, Short.MAX_VALUE))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGap(12, 12, 12)
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(txtID, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(txtCliente, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(txtRazaoSocial, javax.swing.GroupLayout.PREFERRED_SIZE, 414, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel6)
                                    .addComponent(txtCNPJ, javax.swing.GroupLayout.PREFERRED_SIZE, 115, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(txtIE, javax.swing.GroupLayout.PREFERRED_SIZE, 106, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel7))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel8)
                                    .addComponent(txtIM, javax.swing.GroupLayout.PREFERRED_SIZE, 181, javax.swing.GroupLayout.PREFERRED_SIZE)))
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(txtCEP, javax.swing.GroupLayout.PREFERRED_SIZE, 81, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel9))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel10)
                                    .addComponent(txtEndereco, javax.swing.GroupLayout.PREFERRED_SIZE, 241, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(txtNumero, javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel11, javax.swing.GroupLayout.PREFERRED_SIZE, 27, javax.swing.GroupLayout.PREFERRED_SIZE)))
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(txtBairro, javax.swing.GroupLayout.PREFERRED_SIZE, 158, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGroup(layout.createSequentialGroup()
                                        .addGap(4, 4, 4)
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(jLabel12)
                                            .addComponent(jLabel14)))
                                    .addComponent(txtMunicipio, javax.swing.GroupLayout.PREFERRED_SIZE, 158, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel13)
                                    .addComponent(txtComplemento, javax.swing.GroupLayout.PREFERRED_SIZE, 250, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                        .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                                            .addGap(104, 104, 104)
                                            .addComponent(jLabel21)
                                            .addGap(28, 28, 28)
                                            .addComponent(jLabel22))
                                        .addGroup(layout.createSequentialGroup()
                                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                .addComponent(jLabel15)
                                                .addComponent(cbxUF, javax.swing.GroupLayout.PREFERRED_SIZE, 94, javax.swing.GroupLayout.PREFERRED_SIZE))
                                            .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                .addComponent(txtPais, javax.swing.GroupLayout.PREFERRED_SIZE, 150, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addComponent(jLabel16))))))
                            .addComponent(jLabel20)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(txtEmail, javax.swing.GroupLayout.PREFERRED_SIZE, 262, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(txtDDD, javax.swing.GroupLayout.PREFERRED_SIZE, 49, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(txtTelefone, javax.swing.GroupLayout.PREFERRED_SIZE, 91, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(layout.createSequentialGroup()
                                .addGap(4, 4, 4)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel5)
                                    .addGroup(layout.createSequentialGroup()
                                        .addComponent(jLabel2)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(jLabel3)
                                        .addGap(57, 57, 57)
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(txtNomeFantasia, javax.swing.GroupLayout.PREFERRED_SIZE, 260, javax.swing.GroupLayout.PREFERRED_SIZE)
                                            .addComponent(jLabel4))))))))
                .addContainerGap())
            .addGroup(layout.createSequentialGroup()
                .addGap(167, 167, 167)
                .addComponent(pnBotoes, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(6, 6, 6)
                        .addComponent(jLabel1)
                        .addGap(17, 17, 17)
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 354, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(48, 48, 48)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(jLabel2)
                                .addComponent(jLabel3))
                            .addComponent(jLabel4))
                        .addGap(4, 4, 4)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(txtCliente, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(txtID, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(txtNomeFantasia, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(6, 6, 6)
                        .addComponent(jLabel5)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(txtRazaoSocial, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(2, 2, 2)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(jLabel8)
                                    .addComponent(jLabel6))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtCNPJ, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(txtIM, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                        .addComponent(jLabel10)
                                        .addComponent(jLabel9))
                                    .addComponent(jLabel11))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtEndereco, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(txtCEP, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(txtNumero, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGap(4, 4, 4)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(jLabel12)
                                    .addComponent(jLabel13))
                                .addGap(4, 4, 4)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtComplemento, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(txtBairro, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel14)
                                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                        .addComponent(jLabel16)
                                        .addComponent(jLabel15)))
                                .addGap(4, 4, 4)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtMunicipio, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(txtPais, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(cbxUF, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(jLabel21)
                                    .addComponent(jLabel22)
                                    .addComponent(jLabel20))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtDDD, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(txtEmail, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(txtTelefone, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jLabel7)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(txtIE, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(pnBotoes, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void txtNomeFantasiaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtNomeFantasiaActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtNomeFantasiaActionPerformed

    private void txtClienteActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtClienteActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtClienteActionPerformed

    private void txtIDActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtIDActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtIDActionPerformed

    private void txtRazaoSocialActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtRazaoSocialActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtRazaoSocialActionPerformed

    private void txtCNPJActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtCNPJActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtCNPJActionPerformed

    private void txtIEActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtIEActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtIEActionPerformed

    private void txtIMActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtIMActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtIMActionPerformed

    private void txtCEPActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtCEPActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtCEPActionPerformed

    private void txtEnderecoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtEnderecoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtEnderecoActionPerformed

    private void txtNumeroActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtNumeroActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtNumeroActionPerformed

    private void txtBairroActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtBairroActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtBairroActionPerformed

    private void txtComplementoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtComplementoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtComplementoActionPerformed

    private void txtMunicipioActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtMunicipioActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtMunicipioActionPerformed

    private void txtPaisActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtPaisActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtPaisActionPerformed

    private void txtEmailActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtEmailActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtEmailActionPerformed

    private void txtDDDActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtDDDActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtDDDActionPerformed

    private void txtTelefoneActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtTelefoneActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtTelefoneActionPerformed

    private void btnSalvarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnSalvarActionPerformed
        String unidadeId = txtID.getText().trim();
        String cliente = txtCliente.getText().trim();
        String nomeFantasia = txtNomeFantasia.getText().trim();
        String razaoSocial = txtRazaoSocial.getText().trim();
        String cnpj = txtCNPJ.getText().trim(); 
        String ie = txtIE.getText().trim();
        String im = txtIM.getText().trim();
        String cep = txtCEP.getText().trim();
        String endereco = txtEndereco.getText().trim();
        String numero = txtNumero.getText().trim();
        String bairro = txtBairro.getText().trim();
        String complemento = txtComplemento.getText().trim();
        String municipio = txtMunicipio.getText().trim();
        String uf = "";
        if (cbxUF.getSelectedItem() != null) {
            uf = cbxUF.getSelectedItem().toString();
        }
        String pais = txtPais.getText().trim();
        String email = txtEmail.getText().trim();
        String ddd =  txtDDD.getText().trim();
        String telefone = txtTelefone.getText().trim();

        if (cliente.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o cliente.");
            txtCliente.requestFocus();
            return;
        }

        if (nomeFantasia.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o nome fantasia.");
            txtNomeFantasia.requestFocus();
            return;
        }
        if (razaoSocial.isEmpty()) {
            FuncoesGerais.msgAviso("Informe a razão social.");
            txtRazaoSocial.requestFocus();
            return;
        }
        if (cnpj.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o CNPJ.");
            txtCNPJ.requestFocus();
            return;
        }
        if (cep.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o CEP.");
            txtCEP.requestFocus();
            return;
        }
        if (endereco.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o endereço.");
            txtEndereco.requestFocus();
            return;
        }
        if (numero.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o número.");
            txtNumero.requestFocus();
            return;
        }
        if (bairro.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o bairro.");
            txtBairro.requestFocus();
            return;
        }
        if (municipio.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o município.");
            txtMunicipio.requestFocus();
            return;
        }
        if (uf.isEmpty()) {
            FuncoesGerais.msgAviso("Selecione a UF.");
            cbxUF.requestFocus();
            return;
        }
        if (pais.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o país.");
            txtPais.requestFocus();
            return;
        }
        if (ddd.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o DDD.");
            txtDDD.requestFocus();
            return;
        }
        if (telefone.isEmpty()) {
            FuncoesGerais.msgAviso("Informe o telefone.");
            txtTelefone.requestFocus();
            return;
        }
        try {
            boolean sucesso;
            if (Inserindo) {
                // INSERT
                sucesso = empresaDAO.incluirEmpresa(cliente, nomeFantasia, razaoSocial, cnpj, ie, im, cep, endereco, numero, bairro, complemento, municipio, uf, pais, email, ddd, telefone);
                if (sucesso) {
                    FuncoesGerais.msgInformacao("Empresa cadastrada com sucesso!");
                    carregarUnidadesNaTabela(); //atualiza com o registro que acabou de inserir
                    Inserindo = false;
                }
            } else{
                // UPDATE
                sucesso = empresaDAO.atualizarEmpresa(unidadeId, cliente, nomeFantasia, razaoSocial, cnpj, ie, im, cep, endereco, numero, bairro, complemento, municipio, uf, pais, email, ddd, telefone);
                if (sucesso) {
                    FuncoesGerais.msgInformacao("Empresa atualizada com sucesso!");
                    carregarUnidadesNaTabela(); //atualiza com o registro que acabou de atualizar
                }
            }
        } catch (Exception e) {
            FuncoesGerais.msgErro("Erro ao inserir/atualizar registro: " + e.getMessage());
            
        }
        
    }//GEN-LAST:event_btnSalvarActionPerformed

    private void btnFecharActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnFecharActionPerformed
        JFrame topFrame = (JFrame) SwingUtilities.getWindowAncestor(this);
        if (topFrame != null) {
            topFrame.dispose();
        }
    }//GEN-LAST:event_btnFecharActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnFechar;
    private javax.swing.JButton btnSalvar;
    private javax.swing.JComboBox<String> cbxUF;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel13;
    private javax.swing.JLabel jLabel14;
    private javax.swing.JLabel jLabel15;
    private javax.swing.JLabel jLabel16;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel20;
    private javax.swing.JLabel jLabel21;
    private javax.swing.JLabel jLabel22;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JPanel pnBotoes;
    private javax.swing.JTable tblUnidades;
    private javax.swing.JTextField txtBairro;
    private javax.swing.JTextField txtCEP;
    private javax.swing.JTextField txtCNPJ;
    private javax.swing.JTextField txtCliente;
    private javax.swing.JTextField txtComplemento;
    private javax.swing.JTextField txtDDD;
    private javax.swing.JTextField txtEmail;
    private javax.swing.JTextField txtEndereco;
    private javax.swing.JTextField txtID;
    private javax.swing.JTextField txtIE;
    private javax.swing.JTextField txtIM;
    private javax.swing.JTextField txtMunicipio;
    private javax.swing.JTextField txtNomeFantasia;
    private javax.swing.JTextField txtNumero;
    private javax.swing.JTextField txtPais;
    private javax.swing.JTextField txtRazaoSocial;
    private javax.swing.JTextField txtTelefone;
    // End of variables declaration//GEN-END:variables

    public void setLocationRelativeTo(Object object) {
        throw new UnsupportedOperationException("setLocationRelativeTo - Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public void setDefaultCloseOperation(int DISPOSE_ON_CLOSE) {
        throw new UnsupportedOperationException("setDefaultCloseOperation - Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public void setUndecorated(boolean b) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public Component getContentPane() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public void toFront() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }


}
