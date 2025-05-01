module suiguard_randomness::randomness_generator {
    use sui::tx_context::TxContext;
    use sui::event;

    struct RandomBytesEvent has copy, drop {
        bytes: vector<u8>,
    }

    public fun generate_random(_ctx: &mut TxContext): vector<u8> {
  
        let random_bytes = vector<u8>[42, 56, 78, 90, 12, 34, 56, 78, 90, 12, 34, 56, 78, 90, 12, 34];

     
        event::emit(RandomBytesEvent {
            bytes: random_bytes,
        });

        random_bytes
    }
}
