from selenium import webdriver
from selenium.webdriver.common.by import By

from time import sleep

contador = 1

navegador= webdriver.Chrome()
navegador.maximize_window()
navegador.get('file:///K:/RPA_Python/sistema_faker/index.html') # <<== Abra a pasta 'sistema_faker' que esta com index.html e no seu navegador copieo caminho e cole dentro dos parenteses entre apas
navegador.implicitly_wait(1)

titulo = 'Sistema FAKER'
try:
    assert titulo == navegador.title
    print('Título da página: ✅PASS')
except AssertionError:
    print(f'Título da página: ❌FAIL')

with open('produtos_genericos.txt', 'r', encoding='utf-8') as arquivo:
    for linha in arquivo:
        item = linha.split(';')
        if contador == 1:
            item
        else:
            nome_produto = item[0]
            qnt_produto = item[1]
            preco_produto = item[2]
            
            nome = navegador.find_element(By.ID, 'nome')
            nome.is_displayed()
            try:
                assert nome.is_displayed() == True
                print('Campo nome Visível: ✅PASS')
            except AssertionError:
                print('Campo nome Visível: ❌FAIL')

            sleep(1)
            nome.send_keys(nome_produto)

            qnt = navegador.find_element(By.ID, 'quantidade')
            sleep(1)
            qnt.send_keys(qnt_produto)

            preco = navegador.find_element(By.ID, 'preco')
            sleep(1)
            preco.send_keys(preco_produto)

            btn = navegador.find_element(By.CLASS_NAME, 'btn-primary')
            sleep(2)
            btn.is_enabled()
            try:
                assert nome.is_displayed() == True
                print('Botão habilitado: ✅PASS')
            except AssertionError:
                print('Botão habilitado: ❌FAIL')
            btn.click()

        contador += 1

sleep(10)
navegador.close()