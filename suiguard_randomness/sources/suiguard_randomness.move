module suiguard_randomness::randomness_generator {
    use sui::tx_context::TxContext;
    use sui::event;

    // Event to emit random bytes for frontend use
    struct RandomBytesEvent has copy, drop {
        bytes: vector<u8>,
    }

    // Public function to return hardcoded bytes (for testing purposes)
    public fun generate_random(_ctx: &mut TxContext): vector<u8> {
        // Hardcoded vector of bytes (simulating random bytes)
        let random_bytes = vector<u8>[42, 56, 78, 90, 12, 34, 56, 78, 90, 12, 34, 56, 78, 90, 12, 34];

        // Emit the random bytes as an event
        event::emit(RandomBytesEvent {
            bytes: random_bytes,
        });

        random_bytes
    }
}