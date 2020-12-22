using System.Threading.Tasks;
using Functions.Model.DTOs.Mailchimp;

namespace Functions.API.Repositories
{
    public interface IMailchimpRepository
    {
        Task AddMemberAsync(NewSubscriber newSubscriber);
        Task<Member> GetMemberAsync(string email);
        Task UpdateMemberAsync(string email, Member updatedMember);
    }
}