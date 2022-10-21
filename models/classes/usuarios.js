
class Usuarios {
    constructor() {
        this.personas = []
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }
        this.personas = [ persona, ...this.personas ]
        return this.personas
    }

    getPersona(id) {
        let persona = this.personas.filter(p => p.id === id)[0]
        return persona
    }

    getPersonas() {
        return this.personas
    }

    getPersonasPorSala(sala) {
        let personasPorSala = this.personas.filter(p => p.sala === sala)
        return personasPorSala
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id)
        this.personas = this.personas.filter(p => p.id !== id)
        return personaBorrada
    }
}

export default Usuarios