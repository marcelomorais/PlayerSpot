import React, { Component } from 'react';

class WhyRegister extends Component {

  static propTypes = {};

  render() {
    return(
      <div className="right">
        <h2><span>Vantagens de se registrar</span></h2>
        <div className="content-padding">

          <div className="form-split-about">
            <p className="p-padding">Lorem ipsum dolor sit amet, natum referrentur sea no. Sensibus definitionem
              necessitatibus id vim, eu ornatus intellegat argumentum nam. Ius modo interpretaris at, alia erat pri
              te. An euripidis assentior accommodare usu, ut eam fabellas facilisi perpetua. Accumsan scripserit cu
              mel, ut dolorem adolescens per.</p>

            <ul>
              <li>
                <i className="fa fa-trophy"/>
                <b>Promoções e campeonatos</b>
                <p className="p-padding">Participe dos eventos semanais gerados automaticamente pelo portal
                  para ganhar belas recompensas! O portal também promove campeonatos com recompensas para melhorar
                  nosso cenário</p>
              </li>

              <li>
                <i className="fa fa-microphone"/>
                <b>Entrevistas e eventos</b>
                <p className="p-padding">Quer saber sobre as opiniões dos melhores jogadores e streams sobre o cenário
                  e as últimas atualizações? Nós vamos trazer para você!</p>
              </li>

              <li>
                <i className="fa fa-comments"/>
                <b>Conteúdo e fórum</b>
                <p className="p-padding">Nosso portal oferece um contéudo de alta qualidade com as melhores informações
                  sobre os jogos. Também dispomos de um fórum para toda a comunidade participar.
                </p>
              </li>
            </ul>

          </div>

        </div>
      </div>
    );
  }

}

export default WhyRegister;
