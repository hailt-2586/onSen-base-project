import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TeamMembersService } from './team_members.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { StoreTeamMemberDto } from './dto/store-team-member.dto';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamMembersMock } from '@shared/utils/mocks/team-members.mock';

@Controller('team-members')
@ApiTags('team members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @ResponseMessage('Store new a team member')
  @Post()
  @ApiOperation({ summary: 'Store new a team member' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.CREATED, 'Store new a team member', TeamMembersMock.store),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  store(@Body() storeTeamMemberDto: StoreTeamMemberDto) {
    return this.teamMembersService.store(storeTeamMemberDto);
  }

  @ResponseMessage('Update a team member by id')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a team member by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Update a team member by id', TeamMembersMock.update),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  update(@Param('id') id: number, @Body() updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.teamMembersService.update(id, updateTeamMemberDto);
  }

  @ResponseMessage('Delete a team member by id')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team member by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Delete a team member by id', TeamMembersMock.delete),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async remove(@Param('id') id: number) {
    return this.teamMembersService.remove(id);
  }
}
