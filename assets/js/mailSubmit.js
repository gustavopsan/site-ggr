const form = document.getElementById("form-contact");
const response = document.getElementById("form-response");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    var name = document.getElementById("nome");
    var email = document.getElementById("email");
    var subject = document.getElementById("assunto");
    var message = document.getElementById("mensagem");
    
    var html = `<h2>Novo contato através do website: ggrconsultoria.net.br</h2><br/>
      <p><b>Nome:</b> ${name.value}</p>
      <p><b>Email:</b> ${email.value}</p>
      <p><b>Assunto:</b> ${subject.value}</p>
      <p><b>Mensagem:</b> ${message.value}</p>`;

      (async () => {
        const rawResponse = await fetch('https://api-ggr.herokuapp.com/sendMail', {
          method: 'POST',
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({
            destination: "ggr.mkt.consultoria@gmail.com",
            subject: "Novo contato através do website: ggrconsultoria.net.br",
            html: html
        })
        });
        const content = await rawResponse.json();
      
        console.log(content);

        if (content.sent) {
          response.innerText = "Mensagem enviada com sucesso!";
          response.classList.add("success");
          response.removeAttribute("hidden");

          setTimeout(() => {
            response.setAttribute("hidden", true);
          }, 3000);
        }
        else {
          response.innerText = "Erro ao enviar mensagem! Tente novamente em alguns instantes.";
          response.classList.add("error");
          response.removeAttribute("hidden");

          setTimeout(() => {
            response.setAttribute("hidden", true);
          }, 3000);
        }
      })();
})