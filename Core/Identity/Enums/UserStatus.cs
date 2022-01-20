namespace Core.Identity.Enums
{
    public enum UserStatus : int
    {
        OK = 1,
        Locked = 2,
        Confirmed = 3,
        New = 4,
        Rejected = 5,
        NotConfirmed = 6,
        NewUserFromShop = 7,
    }
}
