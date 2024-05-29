import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TeamMembersService } from './team_members.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { StoreTeamMemberDto } from './dto/store-team-member.dto';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Controller('team-members')
@ApiTags('team members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @ResponseMessage('Store new a team member')
  @Post()
  @ApiOperation({ summary: 'Store new a team member' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.CREATED, 'Store new a team member', {
      id: 1,
      created_at: '2024-05-20T19:49:52.062Z',
    }),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  store(@Body() storeTeamMemberDto: StoreTeamMemberDto) {
    return this.teamMembersService.store(storeTeamMemberDto);
  }

  @ResponseMessage('Update a team member by id')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a team member by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Update a team member by id', {
      id: 1,
      updated_at: '2024-05-20T19:49:52.062Z',
    }),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  update(@Param('id') id: number, @Body() updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.teamMembersService.update(id, updateTeamMemberDto);
  }

  @ResponseMessage('Delete a team member by id')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team member by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Delete a team member by id', {
      id: 1,
      deleted_at: '2024-05-20T19:49:52.062Z',
    }),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async remove(@Param('id') id: number) {
    return this.teamMembersService.remove(id);
  }
}
