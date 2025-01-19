use starknet::ContractAddress;

#[starknet::interface]
pub trait IERC20<TContractState> {
    fn get_name(self: @TContractState) -> felt252;
    fn get_symbol(self: @TContractState) -> felt252;
    fn get_decimals(self: @TContractState) -> u8;
    fn get_total_supply(self: @TContractState) -> felt252;
    fn balance_of(self: @TContractState, account: ContractAddress) -> felt252;
    fn allowance(
        self: @TContractState, owner: ContractAddress, spender: ContractAddress,
    ) -> felt252;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: felt252);
    fn transfer_from(
        ref self: TContractState,
        sender: ContractAddress,
        recipient: ContractAddress,
        amount: felt252,
    );
    fn approve(ref self: TContractState, spender: ContractAddress, amount: felt252);
    fn increase_allowance(ref self: TContractState, spender: ContractAddress, added_value: felt252);
    fn decrease_allowance(
        ref self: TContractState, spender: ContractAddress, subtracted_value: felt252,
    );
}

#[starknet::contract]
mod MyNFT {
    use starknet::storage::StoragePathEntry;
    use starknet::ContractAddress;
    use starknet::storage::{
        Map, Vec, VecTrait, MutableVecTrait, StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use core::array::Array;
    // use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use super::{IERC20Dispatcher, IERC20DispatcherTrait};

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // ERC721 Mixin
    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    #[starknet::interface]
    trait NFT<TContractState> {
        fn mint(
            ref self: TContractState,
            minterAddress: ContractAddress,
            nft_uri: ByteArray,
            image_uri: ByteArray,
            nft_name: felt252,
        );
        fn set_price(
            ref self: TContractState,
            NFTHolderAddress: ContractAddress,
            newNFTPrice: u256,
            nftTokenId: u256,
            likeCount: u256,
            commentCount: u256,
            viewCount: u256,
        );
        fn buy_NFT(
            ref self: TContractState,
            OwnerAddress: ContractAddress,
            RecieverAddress: ContractAddress,
            nftTokenId: u256,
        );
        fn get_all_user_data(self: @TContractState) -> Array<User>;
        fn get_particular_user_data(
            self: @TContractState, userAddress: ContractAddress,
        ) -> Array<User>;
    }

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        Agent: ContractAddress,
        UserDetails: Map<ContractAddress, Vec<User>>,
        allUserData: Vec<User>,
        token_id: u256,
        erc20_token: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    // With Store, you can store Data's structs in the storage part of contracts.
    #[derive(Drop, starknet::Store, Serde, Clone)]
    pub struct User {
        address: ContractAddress,
        name: felt252,
        uri: ByteArray,
        image: ByteArray,
        token_id: u256,
        like: u256,
        comment: u256,
        view: u256,
        price: u256,
        hasNFTSold: bool,
    }

    #[constructor]
    fn constructor(ref self: ContractState, erc20_token: ContractAddress) {
        let name = "Pin";
        let symbol = "PNT";
        let base_uri = "";
        let token_id = 0;
        self.erc20_token.write(erc20_token);
        self.token_id.write(token_id);
        self.erc721.initializer(name, symbol, base_uri);
        // Initialize empty array
    // self.allUserData.write(ArrayTrait::<User>::new());
    }

    #[abi(embed_v0)]
    impl MyNFT of NFT<ContractState> {
        fn mint(
            ref self: ContractState,
            minterAddress: ContractAddress,
            nft_uri: ByteArray,
            image_uri: ByteArray,
            nft_name: felt252,
        ) {
            let minter_address: ContractAddress = minterAddress;
            let nftURI: ByteArray = nft_uri.clone();
            let imageURI: ByteArray = image_uri.clone();
            let nftName: felt252 = nft_name;
            let mut current_token_id: u256 = self.token_id.read();

            current_token_id = current_token_id + 1;
            self.token_id.write(current_token_id);

            self.erc721._set_base_uri(nftURI.clone());

            self.erc721.mint(minter_address, current_token_id);

            let mut userr = User {
                address: minter_address,
                name: nftName,
                uri: nftURI,
                image: imageURI,
                token_id: current_token_id,
                like: 0,
                comment: 0,
                view: 0,
                price: 0,
                hasNFTSold: false,
            };

            self.allUserData.append().write(userr.clone());
            self.UserDetails.entry(minter_address).append().write(userr);
        }

        fn set_price(
            ref self: ContractState,
            NFTHolderAddress: ContractAddress,
            newNFTPrice: u256,
            nftTokenId: u256,
            likeCount: u256,
            commentCount: u256,
            viewCount: u256,
        ) {
            //  let mut user_details: u64 = self.UserDetails.entry(NFTHolderAddress).len();
            //  let mut addresses = array![];
            // for i in 0..user_details {
            //     addresses.append(self.UserDetails.entry(NFTHolderAddress).at(i).read());
            // };
            let mut i: u64 = 0;
            while (i < self.UserDetails.entry(NFTHolderAddress).len()) {
                // arr.append(i);
                if (self.UserDetails.entry(NFTHolderAddress).at(i).token_id.read() == nftTokenId) {
                    self.UserDetails.entry(NFTHolderAddress).at(i).price.write(newNFTPrice);
                    self.UserDetails.entry(NFTHolderAddress).at(i).like.write(likeCount);
                    self.UserDetails.entry(NFTHolderAddress).at(i).comment.write(commentCount);
                    self.UserDetails.entry(NFTHolderAddress).at(i).view.write(viewCount);
                }
                i += 1;
            };
        }

        fn buy_NFT(
            ref self: ContractState,
            OwnerAddress: ContractAddress,
            RecieverAddress: ContractAddress,
            nftTokenId: u256,
        ) {
            let mut paid_the_amount: bool = false;
            //  let mut user_details = ArrayTrait::<User>::new();
            let mut i: u64 = 0;
            while (i < self.allUserData.len()) {
                if (i < self.UserDetails.entry(OwnerAddress).len()) {
                    if (self.UserDetails.entry(OwnerAddress).at(i).token_id.read() == nftTokenId
                        && self.UserDetails.entry(OwnerAddress).at(i).hasNFTSold.read() == false) {
                        let mut amin = self.UserDetails.entry(OwnerAddress).at(i).read();

                        if (paid_the_amount == false) {
                            let erc20_dispatcher = IERC20Dispatcher {
                                contract_address: self.erc20_token.read(),
                            };
                            let buyer_balance: u256 = erc20_dispatcher
                                .balance_of(RecieverAddress)
                                .into();
                            assert(buyer_balance >= amin.price, 'insufficient balance');
                            erc20_dispatcher
                                .transfer_from(
                                    RecieverAddress, OwnerAddress, amin.price.try_into().unwrap(),
                                );
                            self.erc721.transfer_from(OwnerAddress, RecieverAddress, nftTokenId);
                            paid_the_amount = true;
                        }

                        let mut userr = User {
                            address: RecieverAddress,
                            name: self.UserDetails.entry(OwnerAddress).at(i).name.read(),
                            uri: self.UserDetails.entry(OwnerAddress).at(i).uri.read(),
                            image: self.UserDetails.entry(OwnerAddress).at(i).image.read(),
                            token_id: nftTokenId,
                            like: self.UserDetails.entry(OwnerAddress).at(i).like.read(),
                            comment: self.UserDetails.entry(OwnerAddress).at(i).comment.read(),
                            view: self.UserDetails.entry(OwnerAddress).at(i).view.read(),
                            price: self.UserDetails.entry(OwnerAddress).at(i).price.read(),
                            hasNFTSold: false,
                        };
                        self.UserDetails.entry(RecieverAddress).append().write(userr.clone());
                        self
                            .UserDetails
                            .entry(OwnerAddress)
                            .at(i)
                            .write(
                                User {
                                    address: OwnerAddress,
                                    name: 0_felt252,
                                    uri: "",
                                    image:"",
                                    token_id: 0,
                                    like: 0,
                                    comment: 0,
                                    view: 0,
                                    price: 0,
                                    hasNFTSold: true,
                                },
                            );
                    }
                }

                if (self.allUserData.at(i).token_id.read() == nftTokenId
                    && self.allUserData.at(i).hasNFTSold.read() == false) {
                    let mut amin = self.allUserData.at(i).read();

                    if (paid_the_amount == false) {
                        let erc20_dispatcher = IERC20Dispatcher {
                            contract_address: self.erc20_token.read(),
                        };
                        let buyer_balance: u256 = erc20_dispatcher
                            .balance_of(RecieverAddress)
                            .into();
                        assert(buyer_balance == amin.price, 'insufficient balance');
                        erc20_dispatcher
                            .transfer_from(
                                RecieverAddress, OwnerAddress, amin.price.try_into().unwrap(),
                            );
                        self.erc721.transfer_from(OwnerAddress, RecieverAddress, nftTokenId);
                        paid_the_amount = true;
                    }

                    let mut userr = User {
                        address: RecieverAddress,
                        name: amin.name,
                        uri: amin.uri,
                        image: amin.image,
                        token_id: nftTokenId,
                        like: amin.like,
                        comment: amin.comment,
                        view: amin.view,
                        price: amin.price,
                        hasNFTSold: false,
                    };
                    self.allUserData.append().write(userr.clone());

                    self
                        .allUserData
                        .at(i)
                        .write(
                            User {
                                address: OwnerAddress,
                                name: 0_felt252,
                                uri: "",
                                image:"",
                                token_id: 0,
                                like: 0,
                                comment: 0,
                                view: 0,
                                price: 0,
                                hasNFTSold: true,
                            },
                        );
                }
                // user_details.append(self.UserDetails.entry(OwnerAddress).at(i).read());
                // self.UserDetails.entry(OwnerAddress).at(i).update(i,user_details[1]);
                i += 1;
            };
        }

        fn get_all_user_data(self: @ContractState) -> Array<User> {
            let mut user_details = ArrayTrait::<User>::new();
            let mut i: u64 = 0;
            while (i < self.allUserData.len()) {
                user_details.append(self.allUserData.at(i).read());
            };
            user_details
        }

        fn get_particular_user_data(
            self: @ContractState, userAddress: ContractAddress,
        ) -> Array<User> {
            let mut user_details = ArrayTrait::<User>::new();
            let mut i: u64 = 0;
            while (i < self.allUserData.len()) {
                user_details.append(self.UserDetails.entry(userAddress).at(i).read());
            };
            user_details
        }
    }
}
