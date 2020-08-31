class Pipeline {
    constructor () {
        this.pipes = []
        this.passable = null
    }

    send (passable) {
        this.passable = passable

        return this
    }

    through (pipes) {
        this.pipes = pipes

        return this
    }

    then (callback) {
        const pipeline = this.pipes.reverse().reduce(this.carry(), callback)

        return pipeline(this.passable)
    }

    carry () {
        return (stack, pipe) => {
            return (passable) => {
                if (typeof pipe !== 'function') {
                    throw new Error(`Invalid pipe [${pipe}]. It must be be a function`)
                }

                return pipe(passable, stack)
            }
        }
    }
}

export default Pipeline