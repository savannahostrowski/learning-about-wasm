class WasmLoader {
    constructor() {
        this._imports = {
            "env": {
                abort() {
                    throw new Error('Abort called from wasm file');
                }
            },
            "index":{
                log(n) {
                    console.log(n);
                }
            }
        }
    }

   async wasm(path, imports = this._imports){
        console.log(`Fetching ${path}`);

        if (!loader.instantiateStreaming) {
            return this.wasmFallBack(path, imports);
        }

        const instance = await loader.instantiateStreaming(fetch(path), imports);

        return instance?.exports;
    }

    async wasmFallBack(path, imports){
        console.log(`Using fallback ${path}`);

        const response = await fetch(path);
        const bytes = await response?.arrayBuffer();
        const instance = loader.instantiate(bytes, imports);

        return instance?.exports;
    }
}