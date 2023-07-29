import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Periodo } from "../../../entities/Periodo";
import DatePicker from "react-datepicker";
import Multiselect from "multiselect-react-dropdown";
import useEntity from "../../../customHooks/useEntity";
import axios from "axios";
import { PESSOA_PATH } from "../../pessoa/path";
import { PERIODO_PATH } from "../path";
import { BASE_URL } from "../../../utils/requests";
const hoje = new Date();

export default function PeriodoForm({
  handleCloseModal,
  entityParaAlterar,
}: {
  handleCloseModal: Function;
  entityParaAlterar: any;
}) {
  const periodoInitialValue = entityParaAlterar.id
    ? entityParaAlterar
    : {
        mes: hoje,
        inicio: hoje,
        fim: hoje,
        valorAtual: 0,
        isFechado: false,
        pagadores: [],
      };
  const [periodo, setPeriodo] = useState<Periodo>(periodoInitialValue);
  const {
    entities: pessoas,
    buscarEntities: buscarPessoas,
    deletarEntity: deletarPessoa,
  } = useEntity(PESSOA_PATH);

  useEffect(() => {
    buscarPessoas();
  }, []);

  function onChangeDateFields(nome: string, valor: any) {
    console.log(valor);
    const targetEmulado = { target: { name: nome, value: valor } };
    onChange(targetEmulado);
  }

  function onChange(event: any) {
    const { name, value } = event.target;
    setPeriodo({ ...periodo, [name]: value });
    console.log(name + ": " + value);
  }

  function handleSelect(selecionados: any) {
    setPeriodo({ ...periodo, pagadores: selecionados });
  }

  function onSubmit(event: any) {
    event.preventDefault();
    console.log("mes: " + periodo.mes);
    console.log("persistindo: " + JSON.stringify(periodo));
    salvarPeriodo();
    handleCloseModal();
  }

  function salvarPeriodo() {
    axios
      .post(`${BASE_URL}${PERIODO_PATH}`, periodo)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => alert(error));
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Mes:</Form.Label>
        <DatePicker
          className="periodo-form-control"
          dateFormat="dd/MM/yyyy"
          selected={periodo.mes}
          onChange={(value) => onChangeDateFields("mes", value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Inicio:</Form.Label>
        <DatePicker
          className="periodo-form-control"
          dateFormat="dd/MM/yyyy"
          selected={periodo.inicio}
          onChange={(value) => onChangeDateFields("inicio", value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Fim:</Form.Label>
        <DatePicker
          className="periodo-form-control"
          dateFormat="dd/MM/yyyy"
          selected={periodo.fim}
          onChange={(value) => onChangeDateFields("fim", value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pagadores:</Form.Label>
        <Multiselect
          options={pessoas}
          onSelect={(pessoa) => handleSelect(pessoa)}
          onRemove={(pessoa) => handleSelect(pessoa)}
          displayValue="nome"
          showCheckbox
          customCloseIcon=" "
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </Form>
  );
}
