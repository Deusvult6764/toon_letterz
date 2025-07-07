
#[starknet::interface]
pub trait IToonLetterz<TContractState> {
    fn get_token_uri(self: @TContractState, token_id: u256) -> ByteArray;
    fn set_token_uri(ref self: TContractState, uri: ByteArray);
    fn mint_item(ref self: TContractState);
}

#[starknet::contract]
mod tlz {
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::token::erc721::extensions::ERC721EnumerableComponent;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use starknet::ContractAddress;
    use starknet::get_caller_address;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: ERC721EnumerableComponent, storage: erc721_enumerable, event: ERC721EnumerableEvent);

    // Add required implementations
    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721EnumerableImpl = ERC721EnumerableComponent::ERC721EnumerableImpl<ContractState>;

    // Internal implementations
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;
    impl ERC721EnumerableInternalImpl = ERC721EnumerableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        erc721_enumerable: ERC721EnumerableComponent::Storage,
        pub counter: u256,
        pub default_uri: ByteArray,
        pub owner: ContractAddress,
        pub has_minted: Map<ContractAddress, bool>,
        pub token_uris: Map<u256, ByteArray>,

    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        ERC721EnumerableEvent: ERC721EnumerableComponent::Event,
        Minted: Minted,
    }
    
    #[derive(Drop, starknet::Event)]
    struct Minted {
        #[key]
        recipient: ContractAddress,
        #[key]
        token_id: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        let caller = get_caller_address();
        self.owner.write(caller);
        self.erc721.initializer("ToonLetterz", "TLT", "");
        self.erc721_enumerable.initializer();
    }

    impl ERC721HooksImpl of ERC721Component::ERC721HooksTrait<ContractState> {
        fn before_update(
            ref self: ERC721Component::ComponentState<ContractState>,
            to: ContractAddress,
            token_id: u256,
            auth: ContractAddress,
        ) {
            let mut contract_state = self.get_contract_mut();
            contract_state.erc721_enumerable.before_update(to, token_id);
        }
    }

    #[abi(embed_v0)]
    impl ToonLetterzImpl of super::IToonLetterz<ContractState> {
        fn get_token_uri(self: @ContractState, token_id: u256) -> ByteArray {
            assert(self.erc721.exists(token_id), ERC721Component::Errors::INVALID_TOKEN_ID);
            self.token_uris.read(token_id)
        }

        fn set_token_uri(ref self: ContractState, uri: ByteArray) {
            let caller = get_caller_address();
            assert!(caller == self.owner.read(), "Only owner can set URI");
            self.default_uri.write(uri);
        }

        fn mint_item(ref self: ContractState) {
            let caller = get_caller_address();
            assert!(!self.has_minted.read(caller), "User has already minted");
            
            let next_id = self.counter.read() + 1;
            self.counter.write(next_id);
            self.erc721.mint(caller, next_id);
            self.has_minted.write(caller, true);

            // Store the current default_uri at time of mint
            let current_uri = self.default_uri.read();
            self.token_uris.write(next_id, current_uri);
            
            // Emit Minted event
            self.emit(Minted { recipient: caller, token_id: next_id });
        }
    }
}