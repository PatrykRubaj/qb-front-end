using Microsoft.Extensions.Options;
using QuantumBudget.Model.Options;

namespace QuantumBudget.API.Tests.Options
{
    public class StripeOptionsMock : IOptions<StripeOptions>
    {
        public StripeOptions Value
        {
            get =>
                new StripeOptions()
                {
                    Domain = "http://localhost:5000",
                    PublicKey =
                        "pk_test_51HQqj5ARU7b93yerToBEILcN6wnAaJQDxeR6aZjRPX1l3jumodSXtxVwOly5lcbtIJE0ofkZUpeziWBbyKmwHCFO008wLQl7vm",
                    SecretKey =
                        "sk_test_51HQqj5ARU7b93yer9zjW02yhUi8O96mJSBHeSC18wp4iYwjJRKmeRuUb3j4dWiIgQaqUw34MAIoSGJ5IPdaEVALf00CXGIh6Mv",
                    WebhookSecret = "whsec_g6pND8HOaUZaNpk0uUiUlTKzZP8LomW9",
                };
        }
    }
}