using System.Threading.Tasks;
using QuantumBudget.Model.DTOs.Mailchimp;

namespace QuantumBudget.Repositories
{
    public interface IMailchimpRepository
    {
        Task AddMemberAsync(NewSubscriberDto newSubscriber);
        Task<MemberDto> GetMemberAsync(string email);
        Task UpdateMemberAsync(string email, MemberDto updatedMember);
    }
}